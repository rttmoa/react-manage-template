/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const { merge } = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除 xx 文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin') //* 将单个文件或整个目录复制到构建目录。

//* 优化：CSS 代码压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// Tree Shaking: https://webpack.docschina.org/guides/tree-shaking
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin') // CSS Tree Shaking: 用于去除无用的样式
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin') // 该插件使用 html-minifier-terser 来优化和缩小您的 HTML

// “compression-webpack-plugin”插件能够通过压缩算法，将前端打包好的资源文件进一步压缩，生成指定的、体积更小的压缩文件，让浏览器能够更快的加载资源。
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const SentryWebpackPlugin = require('@sentry/webpack-plugin') // Sentry 翻译过来是「哨兵」的意思，可以监控程序代码中出现的报错问题，生成issue
const TerserJSPlugin = require('terser-webpack-plugin') // 多进程 js压缩

const { EsbuildPlugin } = require('esbuild-loader') // esbuil


const packageJson = require('../package.json')
const baseConfig = require('./webpack.common.js')

const useSentryMap = process.env.SENTRY_SOURCE_MAP === 'map' // 获取SENTRY_SOURCE_MAP变量：判断是否开启哨兵模式
const resolveDir = (dir) => path.resolve(__dirname, dir)



/**
 * ! 生产环境
 *  yarn build:production
 *  yarn analyze:build
 */
const prodWebpackConfig = merge(baseConfig, {

  mode: 'production',

  //* 使用文件缓存，首次缓存时间和二次缓存时间对比
  // cache: { type: 'filesystem', buildDependencies: { config: [__filename] } },

  devtool: 'source-map', // 生成完整的 source map 文件，有助于调试和定位问题，但会增加构建时间和文件大小
  // devtool: 'hidden-source-map', // 生成 source map 文件但不暴露源代码路径，适用于生产环境中需要保护源代码的情况。

  // @插件
  plugins: [
    // 自动清理文件夹 (dist)，就不用 rimraf 删除文件夹了 （清除dist和dist3目录）
    new CleanWebpackPlugin().removeFiles([resolveDir('../dist'), resolveDir('../dist3')]),

    // 定义环境变量为开发环境（可以在模块中直接使用这些变量，无需任何声明 console.log(process.env.NODE_ENV)）
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // 优化：CSS Tree Shaking：先分离CSS，再Tree Shaking； 打包时把没有用的 CSS 代码摇走，可以大幅减少打包后的 CSS 文件大小。
    new PurgeCSSPlugin({
      //  glob node提供 查找src文件下的所有文件夹
			// nodir: true 是查找所有的文件
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
      only: ['bundle', 'vendor', 'dist'],
      // 添加白名单，看哪些不需要删除,默认标签选择器是不删除的
      safelist: {
        standard: [/^ant-/],
      },
    }),

    // 开启Gzip压缩
    // 需要在 Nginx 中配置 Gzip
    // 优化：所有现代浏览器都支持gzip压缩，启动gzip压缩可大幅缩减传输资源大小，从而缩短资源下载时间，减少首次白屏时间，提升用户体验；
    // gzip对基于文本格式的压缩效果最好，如css,html,js，在压缩较大文件时可实现70-90的压缩率，对压缩过的图片资源处理，效果很不好
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.json$|\.css/,
      // test: new RegExp( `\\.(${['js','css','json'].join('|')})$`),
      threshold: 10240, // 只有大小大于 10k 该值的资源会被处理。默认值是 0
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理,默认值是 0.8
      // deleteOriginalAssets: true // 删除原文件
    }),

    // 将单个文件或整个目录复制到构建目录
    // 作用：开发环境我们可以正常的访问public里面的静态资源，但是在生产阶段，public里面的资源并没有构建到dist文件里面，丢失不见了，
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
        {
          from: path.resolve(__dirname, '../src/assets/svg/three-dots.svg'),
          to: 'copy-three-dots.svg',
        },
        // {
        //   from: path.resolve(__dirname, '../src/resource/dll'),
        //   to: 'resource/dll',
        // },
      ],
    }),
    // 作用域提升,提升代码在浏览器执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.ids.HashedModuleIdsPlugin(),
  ],

  // @可以对打包过程进行优化，提高打包效率和最终生成的代码性能
  optimization: {
    // runtimeChunk = true，为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
    runtimeChunk: { name: 'runTime' },
    // 长期缓存优化;;
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    mangleExports: 'deterministic',
    // webpack会对打包后的代码进行压缩、减小文件大小
    minimize: true,
    // 配置用于压缩代码插件：如`Terserplugin`、`OptimizeCSSAssetsPlugin`
    minimizer: [
      // 这将仅在生产环境开启 CSS优化 和 CSS压缩: https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/
      new CssMinimizerPlugin({
        parallel: 4, // 使用多进程并发执行，提升构建速度
      }),
      // 将 ES6 和 js 代码转换为 ES5代码；以便在旧版本浏览器中运行。
      new EsbuildPlugin({
        target: 'es2015',
      }),

      // new HtmlMinimizerPlugin(),

      // 优化：多进程 压缩JavaScipt代码
      // TerserJSPlugin 插件, 替代 uglifyjs-webpack-plugin 插件， 它的作用依然是对构建输出的代码进行压缩
      // 除了 TerserWebpackPlugin，Webpack 5+ 官方维护的 HtmlMinimizerWebpackPlugin、CssMinimizerWebpackPlugin 和 ImageMinimizerWebpackPlugin 等插件均提供可缓存的配置项。
      new TerserJSPlugin({
        // 并发运行的默认数量,使用多进程并发运行压缩以提高构建速度。默认：os.cpus().length - 1
        parallel: 4,
        // cache: true,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    // SplitChunksPlugin：https://webpack.docschina.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'all', // 默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效, `async`只提取异步加载的模块出来打包到一个文件中
      minSize: 30000, // 单位为字节，默认为30000，只有超过了30000字节才会被提取。 (大约29.3kb)
      minChunks: 3, // 表示要被提取的模块最小被引用次数，引用次数超过或等于minChunks值，才能被提取。
      // name: true, // 打包生成js文件的名称。
      maxAsyncRequests: 6, // 最大的按需(异步)加载次数，默认为 6。
      maxInitialRequests: 4, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件），默认为4。
      automaticNameDelimiter: '~', // 打包生成的js文件名的分割符，默认为~。
      cacheGroups: {
        // default: {
        //   // 模块缓存规则，设置为false，默认缓存组将禁用
        //   minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
        //   priority: -2, // 优先级
        //   reuseExistingChunk: true, // 默认使用已有的模块
        // },
        // dll: {
        //   test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|babel-polyfill|antd|@ant-design)/,
        //   minChunks: 1,
        //   priority: 10,
        //   name: 'dll-Split',
        //   chunks: 'all',
        // },
        // ! 这里处理 react-icons 库，分别处理 react-icons/md 和 react-icons/bs
        'react-icon/md': {
          test: /[\\/]node_modules[\\/](react-icons|react-icons\/md)/,
          name: 'split-react-icons-md',
          minChunks: 1,
          priority: 10,
          maxSize: 30000, // 30kb 提取模块后打包生成的文件大小不能超过maxSize值，如果超过了，要再提取并打包生成新的文件。
          enforce: true, // 为true时，忽略minSize，minChunks，maxAsyncRequests和maxInitialRequests外面配置选项。
          chunks: 'all', // ! 自动重复代码抽离
        },
        'react-icon/bs': {
          test: /[\\/]node_modules[\\/](react-icons|react-icons\/bs)/,
          name: 'split-react-icons-bs',
          minChunks: 1,
          priority: 10,
          maxSize: 30000,
          enforce: true,
          chunks: 'all',
        },
        antd: {
          test: /[\\/]node_modules[\\/](antd)/,
          name: 'split-antd',
          minChunks: 1,
          priority: 10,
          maxSize: 30000, // 30kb 提取模块后打包生成的文件大小不能超过maxSize值，如果超过了，要再提取并打包生成新的文件。
          enforce: true,
        },
        '@ant-design': {
          test: /[\\/]node_modules[\\/](@ant-design)/,
          name: 'split-ant-design',
          minChunks: 1,
          priority: 10,
          maxSize: 30000, // 30kb 提取模块后打包生成的文件大小不能超过maxSize值，如果超过了，要再提取并打包生成新的文件。
          enforce: true,
        },
        '@sentry': {
          test: /[\\/]node_modules[\\/](@sentry)/,
          name: 'split-sentry',
          minChunks: 1,
          priority: 10,
          maxSize: 30000, // 30kb 提取模块后打包生成的文件大小不能超过maxSize值，如果超过了，要再提取并打包生成新的文件。
          enforce: true,
        },
        echarts: {
          test: /[\\/]node_modules[\\/]echarts/,
          name: 'split-echarts',
          minChunks: 1,
          priority: 10,
          maxSize: 30000, // 30kb 提取模块后打包生成的文件大小不能超过maxSize值，如果超过了，要再提取并打包生成新的文件。
          enforce: true,
          reuseExistingChunk: true,
        },
        video: {
          test: /[\\/]node_modules[\\/]video/,
          name: 'split-video',
          minChunks: 1,
          priority: 10,
          maxSize: 30000, // 30kb 提取模块后打包生成的文件大小不能超过maxSize值，如果超过了，要再提取并打包生成新的文件。
          enforce: true,
          reuseExistingChunk: true,
        },
        react: {
          test(module) {
            // `module.resource` contains the absolute path of the file on disk.
            // console.log(module.resource)
            return module.resource && module.resource.includes('node_modules/react')
          },
          chunks: 'initial',
          filename: 'react.[contenthash:6].js',
          priority: 5,
          maxInitialRequests: 2,
          minChunks: 1,
        },
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendor-nodeModules',
        //   minChunks: 1,
        //   priority: 1, // 确定模块打入的优先级
        //   reuseExistingChunk: true, // 使用复用已经存在的模块
        //   enforce: true,
        //   chunks: 'all',
        // },
      },
    },
  },
  // Webpack在打包过程中对于资源大小的监控和警告输出
  performance: {
    hints: 'error', // 当资源大小超过阈值时，Webpack会输出一个错误  'error' | 'warning' | false
    // 设置入口起点的最大体积，超过这个大小会触发性能提示（默认 250000 bytes）
    maxEntrypointSize: 250000,
    // 设置单个资源的最大体积，超过这个大小会触发性能提示（默认 250000 bytes）
    maxAssetSize: 250000,
    // 一个用于过滤资源的函数，只有返回 true 的资源会被计算在内
    // assetFilter(assetFilename) {
    //   return assetFilename.endsWith('.js')
    // },
  },
})

// 开启哨兵
if (useSentryMap) {
  prodWebpackConfig.plugins.push(
    new SentryWebpackPlugin({
      release: packageJson.version,
      include: path.join(__dirname, '../dist/static/js'),
      configFile: '../.sentryclirc',
      urlPrefix: '~/static/js',
    })
  )
}

module.exports = prodWebpackConfig

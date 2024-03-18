/* eslint-disable no-unused-vars */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // ! 主要作用就是在webpack构建后生成html文件，同时把构建好入口js文件引入到生成的html文件中。
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // ! 查看打包后生成的 bundle 体积分析
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin') // ! 优化 monmentjs和dayjs打包体积
const Dotenv = require('dotenv-webpack') // ! 让程序在不同的环境下执行不同的命令。 代码中通过process.env.DB_HOST获取.env中数据
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin') // ! 如果路径有误则直接报错
const CircularDependencyPlugin = require('circular-dependency-plugin') // ! 它可以检测并报告模块间的循环依赖问题。使用该插件可以帮助我们及时发现和修复循环依赖问题
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 可以把css代码打包到单独的css文件，且可以设置存放路径（通过设置插件的filename和chunkFilename）
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin') // ?
const WebpackBar = require('webpackbar') // ! 进度条：https://blog.csdn.net/weixin_44691608/article/details/117558101
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // ! 进度条：https://blog.csdn.net/weixin_44691608/article/details/117558101
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin') // ! 在单独的进程上运行 TS 类型检查器的 Webpack 插件。
const ESLintWebpackPlugin = require('eslint-webpack-plugin') // ? 引入 ESLint 插件：https://blog.csdn.net/jieyucx/article/details/131119809
const chalk = require('chalk')
const HappyPack = require('happypack')
const os = require('os')
const paths = require('./paths')

// console.log('cpu length', os.cpus().length) // 16
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length / 2 })

const isDev = process.env.NODE_ENV === 'development' // 环境变量：通过packageJSON NODE_ENV=development 指定环境

const UNABLE_ANALYZE = 0
const USE_ANALYZE = process.env.USE_ANALYZE || UNABLE_ANALYZE

let dotEnv = ''
// process.env.BUILD_GOAL 来自 package.json文件 (不同的环境得到的 env文件不同)
switch (process.env.BUILD_GOAL) {
  case 'development':
    dotEnv = '.env.development'
    break
  case 'production':
    dotEnv = '.env.production'
    break
  case 'dev':
    dotEnv = '.env.dev'
    break
  case 'test':
    dotEnv = '.env.test'
    break
  default:
    dotEnv = '.env.development'
}

// 拼接路径
const resolve = (dir) => path.join(__dirname, '..', dir)
const srcDir = path.resolve(__dirname, '../src')
// console.log('dirname', path.resolve(__dirname)) // E:\Project\REFERENCE\pro-react-admin\webpack

// ? 开发环境和生产环境公共配置
// ? 优化编译速度 & 包优化：https://blog.csdn.net/u010753613/article/details/125479116
const config = {
  // 入口文件 （单页面）
  entry: {
    appEnter: `${paths.src}/index.tsx`,
  },
  // output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。
  output: {
    // 生产环境所有文件存放的位置
    path: paths.build,
    publicPath: isDev ? '/' : './', // https://www.webpackjs.com/configuration/output/#outputpublicpath
    // 输出 bundle 的名称
    filename: isDev ? 'static/js/[name].[hash:8].js' : 'static/js/file.[name].[contenthash:6].js',
    // 配置无入口的 Chunk 在输出时的文件名称
    chunkFilename: isDev ? 'chunks/js/[name].js' : 'chunks/js/chunkfile.[name].[contenthash:6].chunk.js',
    // library: '', // 配置导出库的名称
    // libraryTarget: 'umd', // 配置以何种方式导出库
    // chunkLoadingGlobal: '',
    clean: true, // 清除上一次的垃圾文件
    // contentBase: path.join(__dirname, "public"), // 配置额外的静态文件内容的访问路径
    assetModuleFilename: 'images/[contenthash][ext]', // 在images目录下，根据文件内容自动生成hash文件名
  },

  // 配置模块如何被解析
  resolve: {
    // 优化resolve.extensions配置: 自动解析文件扩展名(补全文件后缀)(从左->右)
    // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
    extensions: ['.*', '.js', '.jsx', '.ts', '.tsx', '.json'],
    // 使用别名提高编译速度
    alias: {
      '@': path.resolve('./src'),
      '@src': path.resolve('./src'),
      '@stateless': path.resolve('./src/components/stateless'),
      '@stateful': path.resolve('./src/components/stateful'),
      '@hooks': path.resolve('./src/components/hooks'),
      '@container': path.resolve('./src/components/container'),
      '@assets': path.resolve('./src/assets'),
      '@pages': path.resolve('./src/pages'),
      '@routers': path.resolve('./src/routers'),
      '@utils': path.resolve('./src/utils'),
      '@theme': path.resolve('./src/theme'),
      // 优化resolve.alias配置
      // react: path.resolve(__dirname, '../node_modules/react/umd/react.production.min.js'),
      // 'react-dom': path.resolve(__dirname, '../node_modules/react-dom/umd/react-dom.production.min.js'),
      // 'react-dom': isDev ? '@hot-loader/react-dom' : 'react-dom', // react-hot-loader需要
    },
    // 优化：告诉 Webpack 解析模块时应该搜索的目录
    // modules: [path.resolve(__dirname, '../node_modules')],
    symlinks: false,
  },
  // ! plugins 选项用于以各种方式自定义 webpack 构建过程。
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '..', dotEnv), //* 根据哪个环境去读取 env文件
    }),
    // 在js中分离css提取为独立文件，支持按需加载 (该插件应该只用在生产环境配置，并且 loaders 链中使用 style-loader，而且这个插件暂时不支持 HMR)
    new MiniCssExtractPlugin({
      // 分离出的文件重新命名
      filename: isDev ? 'static/css/[name].css' : 'static/css/[name].[contenthash:6].css',
      // chunkFilename: isDev ? 'chunks/css/[name].[id].css' : 'chunks/css/[name].[contenthash:6].css', // 1770.865d6b.css
      chunkFilename: isDev ? 'chunks/css/[name].[id].css' : 'chunks/css/[id].[contenthash:6].css', // 1770.f0cf6c.css
      // chunkFilename: isDev ? 'chunks/css/[name].[id].css' : 'chunks/css/[hash].[name].css', // 06900353abf0cf6cda50.1770.css
      ignoreOrder: true,
    }),

    // 报错但不退出 webpack 进程，编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段，这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),

    // 作用: HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，并把打包生成的js文件自动引入到这个html文件中
    new HtmlWebpackPlugin({
      // 多页应用打包配置：https://blog.51cto.com/u_15809510/5968219
      title: isDev ? 'Pro React Dev' : 'Pro React',
      template: `${paths.public}/index.html`, // 源文件的绝对路径
      favicon: `${paths.public}/favicon.ico`, // 配置网站图标
      filename: 'index.html', // 生成的文件名
      scriptLoading: 'defer', // ! 以非阻塞的方式加载script脚本 <script src="defer">
      inject: 'body',
      hash: true,
      cache: false,
      // 项目打包时 文件压缩操作。
      minify: isDev
        ? false
        : {
            // 更多配置：https://github.com/kangax/html-minifier#options-quick-reference
            removeAttributeQuotes: true, // 去除属性引号
            collapseWhitespace: true, // 去除空格
            removeComments: true, // 删除Html注释
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
      // 这里列出要加入html中的js文件  注释不用dll
      dlls: [
        // './resource/dll/vendor.dll.js',
        // './resource/dll/redux.dll.js',
      ],
    }),
    // Antd moment.js打包体积优化之路: https://segmentfault.com/a/1190000041629544?utm_source=sf-similar-article
    new AntdDayjsWebpackPlugin(), // 优化 monmentjs和dayjs打包体积
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CaseSensitivePathsPlugin(), // 如果路径有误则直接报错
    // 它可以检测并报告模块间的循环依赖问题。
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new NodePolyfillPlugin(),
    // 进度条
    // new WebpackBar(),
    // 优化：进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
    // TS 类型检查器
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules', // 默认值
      cache: true, // 开启缓存
      cacheLocation: path.resolve(__dirname, '../node_modules/.cache/.eslintcache'), // 缓存目录
    }),

    // HappyPack
    // 由于 HappyPack 对 file-loader、url-loader 支持的不友好，所以不建议对这些 loader 使用
    new HappyPack({
      // 用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      // 如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            // babelrc: true,
            cacheDirectory: true, // 启用缓存
          },
        },
      ],
      // 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      // 允许 输出日志
      verbose: true,
    }),
    new HappyPack({
      // 用id来标识 happypack处理那里类文件
      id: 'happcyStyle',
      // 如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 之前有2个loaders
            // modules: true, // 启用cssModules
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true, // 为true,在样式追溯时，显示的是编写时的样式，为false，则为编译后的样式
          },
        },
        // {
        //   loader: 'less-loader',
        //   options: {
        //     sourceMap: true,
        //   },
        // },
      ],
      // 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      // 允许 输出日志
      verbose: true,
    }),
  ],

  // TODO: 处理模块的规则（必要的，缺少影响项目打包）
  // 配置： CSS、LESS、JS、TS、JPG、PNG、SVG
  module: {
    // 将缺失的导出提示成错误而不是警告
    strictExportPresence: true,
    // webpack中的loader（转换器）   https://www.yuque.com/yuqueyonghua2m9wj/web_food/ler3mg32asyiodg8#iOhQy
    //  以下是一些常用的webpack loader：
    //    babel-loader：用于将ES6+的JavaScript代码转换为ES5代码，以便在旧版本浏览器中运行。
    //    css-loader：用于解析CSS文件，并处理其中的import和url()等语法。
    //    style-loader：将解析后的CSS代码以<style>标签的形式插入到HTML文件中。
    //    file-loader：用于处理文件资源（如图片、字体等），并将其复制到输出目录中。
    //    url-loader：类似于file-loader，但可以根据文件大小将文件转换为DataURL，以减少HTTP请求。
    //    sass-loader：用于将Sass/SCSS代码转换为CSS代码。
    //    less-loader：用于将Less代码转换为CSS代码。
    //    postcss-loader：用于对CSS代码进行后处理，如自动添加浏览器前缀等。
    //    vue-loader：用于解析和转换Vue单文件组件。
    //    ts-loader：用于将TypeScript代码转换为JavaScript代码。

    // Webpack Guidebook：https://tsejx.github.io/webpack-guidebook/best-practice/practical-application
    // 组合配置
    // 加载样式 PostCSS
    // 加载图片 url-loader、file-loader & 加载svg
    // 加载字体 woff,ttf
    // 加载脚本 Babel
    // 环境变量
    rules: [
      /**
       * 解析css 需要style-loader css-loader
       * 解析less需要style-loader css-loader less-loader
       * 此时将css代码打包到js文件中
       * 缺点： 1.包体积大，加载慢
       *          2.创建在html创建style标签，加载时先加载js,后加载style,会出现闪频
       *
       *
       * 基于以上缺点：需将css包单独分离  mini-css-extract-plugin插件，则需要去掉style-loader;
       */
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 仅生产环境
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/i,
        // test: /\.(css|less)$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          // 'style-loader',
          // 在js中分离css：分离css,使用插件mini-css-extract-plugin，需要在plugins里面实例化以及用MiniCssExtractPlugin.loader取代style-loader
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 实现css代码分离
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[local]--[hash:base64:5]',
                localIdentContext: paths.src,
                namedExport: false,
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 2,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  'postcss-normalize',
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        /**
         * js兼容处理需要用到的包babel-laoder @babel/core @babel/preset-env,可以将es6语法转换成es5
         *  1.基本的兼容性处理 --> @babel/preset-env
         *  问题1.只能转换基本语法，如promise不能转换
         * 2.全部js兼容处理--> @babel/polyfill,不需要配置，只需要在入口文件引入即可
         *      问题，我只需要解决部分兼容性问题，但是将所有兼容性代码全部引入，包太大
         * 3.需要做兼容性就做，按需加载-->core-js
         * */
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/, // 业务代码里面可能会引入node_modules外部js，这些js不需要babel-loader编译，因此需要排除掉
        // 优化：缩小文件搜索范围 = 只命中 src 目录里的 JavaScript 文件，加快 Webpack 的搜索速度
        // include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              // loader: 'tsx',
              target: 'ES2015',
            },
          },
          {
            // babel-loader 提供 cacheDirectory 字段启用转换结果缓存的功能，开启时缓存会存放在 node_modules/.cache/babel-loader 目录下
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              // 引入预设：提示babel做怎么样的兼容性处理
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'], // 配置插件信息
            },
          },
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workerParallelJobs: 2,
          //   },
          // },
          // 把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
          //  loader: 'happypack/loader?id=happyBabel',
          // {
          //   loader: 'happypack/loader?id=happybabel',
          // },
        ],
      },
      // dz config
      // 处理：png|jpe?g|gif|svg|ico
      // 处理：mp4|webm|ogg|mp3|wav|flac|aac
      // 处理：woff2?|eot|ttf|otf
      {
        test: /\.(png|jpe?g|gif|webp|eot|ttf|woff|woff2|mp4)$/i,
        type: 'asset',
        parser: {
          // Conditions for converting to base64
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        },
        include: [srcDir],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
        include: [srcDir],
      },
      // 加载csv、xml数据资源 npm install csv-loader xml-loader -D
      // {
      //   test: /\.(csv|tsv)$/,
      //   use: 'csv-loader',
      // },
      // {
      //   test: /\.xml$/,
      //   use: 'xml-loader',
      // },
    ],
  },
}
// ! 使用：yarn analyze:build
if (USE_ANALYZE) {
  // 打包分析: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }))
}

module.exports = config

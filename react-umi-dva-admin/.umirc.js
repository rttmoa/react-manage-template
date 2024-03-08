// TODO: https://umijs.org/docs/api/config

import { resolve } from 'path'
const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')
const isDevelopment = process.env.NODE_ENV === 'development'
console.log('isDevelopment', isDevelopment)

const { theme } = require('antd/lib')
const { convertLegacyToken } = require('@ant-design/compatible/lib')

const mapToken = theme.defaultAlgorithm(theme.defaultSeed)
const v4Token = convertLegacyToken(mapToken)

// how to speed compile: https://umijs.org/guide/boost-compile-speed
export default {
  // 重要的！ 将下一行更改为您的或删除。并隐藏在dev中
  // publicPath: isDevelopment ? '/' : 'https://cdn.antd-admin.zuiidea.com/',
  publicPath: isDevelopment ? '/' : './',
  // <link rel="stylesheet" href="https://cdn.antd-admin.zuiidea.com/umi.b61721e6.css" />

  // 配置别名，对引用路径进行映射。
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
  antd: false,
  // analyze: {}, // 包模块结构分析工具，可以看到项目各模块的大小，按需优化
  // autoprefixer: {}, // 通过 Can I Use 解析 CSS 并将供应商前缀添加到规则中
  // base: "", // 设置路由前缀，通常用于部署到非根目录。
  // cssLoader: {}, // 配置loader、类名变成驼峰命名形式
  // cssnano: {}, // 压缩css
  // copy: [ { from: 'bar/bar.js', to: 'some/bar.js', }, ], // 设置要复制到输出目录的文件或文件夹。
  // define: {FOO: 'bar',}, // 用于提供给代码中可用的变量。
  // devServer: {}, 配置开发服务器。
  // devtool: "eval", // 用户配置 sourcemap 类型
  // exportStatic // 配置 html 的输出形式，默认只输出 index.html
  // externals // 设置哪些模块可以不被打包，通过 <script> 或其他方式引入，通常需要和 scripts 或 headScripts 配置同时使用
  // extraBabelPlugins // 配置额外的 babel 插件
  // extraPostCSSPlugins // 配置额外的 postcss 插件。
  // favicon // 配置 favicon 地址（href 属性）。
  // forkTSChecker // 开启 TypeScript 编译时类型检查，默认关闭。
  // fastRefresh  // 快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。
  // hash // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。   启用 hash 后，产物通常是这样，  - umi.df723s.j    - umi.8sd8fw.css
  // history // 配置 history 类型和配置项。
  // inlineLimit // 配置图片文件是否走 base64 编译的阈值
  // lessLoader // 设置 less-loader 配置项。
  // manifest // 配置是否需要生成额外用于描述产物的 manifest 文件，默认会生成 asset-manifest.json。
  // metas // 配置额外的 meta 标签。数组中可以配置key:value形式的对象。

  // outputPath // 指定输出路径。
  // postcssLoader // 设置 postcss-loader 配置项。
  // proxy // 配置代理能力。
  // publicPath // 开发和生产模式的配置： https://v3.umijs.org/zh-CN/config#publicpath
  // routes // 配置路由。
  // runtimePublicPath // 配置是否启用运行时 publicPath。
  // styleLoader // 启用并设置 style-loader 配置项，用于让 CSS 内联打包在 JS 中，不输出额外的 CSS 文件
  // styles // 配置额外 CSS。
  // targets // 配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。
  // terserOptions // 配置压缩器 terser 的配置项。
  // theme
  // title

  favicon: './favicon.ico',
  title: 'react-umi-dva-admin',
  // 一种较低成本的生成sourcemap的方法，默认是cheap-module-source-map，可以节省60％的开发热加载时间
  devtool: 'eval', // eval: 最快的类型，但不支持低版本浏览器，如果编译慢，可以试试  |  source-map，最慢最全的类型
  dva: { immer: true },
  // 是否启用按需加载，即是否把构建产物进行拆分，在需要的时候下载额外的 JS 再执行。 https://v3.umijs.org/zh-CN/config#dynamicimport
  dynamicImport: {
    loading: 'components/Loader/Loader',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'es/icons',
        camel2DashComponentName: false,
      },
      'ant-design-icons',
    ],
    ['macros'],
  ],
  hash: true,
  ignoreMomentLocale: true,
  // umi3 完整的node_modules 默认情况下，可以禁用
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  // Webpack Configuration
  proxy: {
    '/api/v1/weather': {
      target: 'https://api.seniverse.com/',
      changeOrigin: true,
      pathRewrite: { '^/api/v1/weather': '/v3/weather' },
    },
    // 访问 /api/users 就能访问到 http://jsonplaceholder.typicode.com/users 的数据。
    // '/api': {
    //   'target': 'http://jsonplaceholder.typicode.com/',
    //   'changeOrigin': true,
    //   'pathRewrite': { '^/api' : '' },
    // }
  },
  // Theme for antd
  // !: https://ant.design/docs/react/customize-theme
  theme: {
    ...v4Token,
    ...lessToJs(
      fs.readFileSync(path.join(__dirname, './src/themes/default.less'), 'utf8')
    ),
  },
  webpack5: {}, // 使用 webpack 5 代替 webpack 4 进行构建。
  mfsu: {}, // 开启该功能将会自动开启 webpack5 和 dynamicImport.
  // 通过 webpack-chain 的 API 修改 webpack 配置: https://v3.umijs.org/zh-CN/config#chainwebpack
  chainWebpack: function (config, { webpack }) {
    // ! umi 3.X 优化build文件目录: https://blog.csdn.net/m0_37809081/article/details/135276107
    // 修改css输出目录
    !isDevelopment &&
      config.plugin('extract-css').tap(() => [
        {
          filename: `css/[name].[contenthash:8].css`,
          chunkFilename: `css/[name].[contenthash:8].chunk.css`,
          ignoreOrder: true,
        },
      ]),
      // 修改js输出目录
      !isDevelopment &&
        config.output
          .filename(`js/[name].[hash:8].js`)
          .chunkFilename(`js/[name].[contenthash:8].chunk.js`),
      !isDevelopment &&
        config.module
          .rule('images')
          .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
          .use('url-loader')
          .loader(require.resolve('url-loader'))
          .tap((options) => {
            const newOptions = {
              ...options,
              name: '/images/[name].[hash:8].[ext]',
              fallback: {
                ...options.fallback,
                options: {
                  name: '/images/[name].[hash:8].[ext]',
                  esModule: false,
                },
              },
            }
            return newOptions
          }),
      !isDevelopment &&
        config.module
          .rule('svg')
          .test(/\.(svg)(\?.*)?$/)
          .use('file-loader')
          .loader(require.resolve('file-loader'))
          .tap((options) => ({
            ...options,
            name: '/images/[name].[hash:8].[ext]',
            esModule: false,
          })),
      // 修改css文件资源文件访问路径
      !isDevelopment &&
        config.module
          .rule('css')
          .oneOf('css')
          .use('extract-css-loader')
          .tap((options) => ({
            publicPath: '../../',
            hmr: false,
          })),
      !isDevelopment &&
        config.module
          .rule('less')
          .oneOf('css')
          .use('extract-css-loader')
          .tap((options) => ({
            publicPath: '../../',
            hmr: false,
          })),
      !isDevelopment &&
        config.module
          .rule('less')
          .oneOf('css-modules')
          .use('extract-css-loader')
          .tap((options) => ({
            publicPath: '../../',
            hmr: false,
          })),
      // await delay(2000) // 支持异步
      !isDevelopment &&
        config.merge({
          optimization: {
            minimize: false,
            splitChunks: {
              chunks: 'all',
              minSize: 30000,
              minChunks: 3,
              automaticNameDelimiter: '.',
              cacheGroups: {
                react: {
                  name: 'react',
                  priority: 20,
                  test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
                },
                antd: {
                  name: 'antd',
                  priority: 20,
                  test: /[\\/]node_modules[\\/](antd|@ant-design\/icons)[\\/]/,
                },
                'echarts-gl': {
                  name: 'echarts-gl',
                  priority: 30,
                  test: /[\\/]node_modules[\\/]echarts-gl[\\/]/,
                },
                zrender: {
                  name: 'zrender',
                  priority: 30,
                  test: /[\\/]node_modules[\\/]zrender[\\/]/,
                },
                echarts: {
                  name: 'echarts',
                  priority: 20,
                  test: /[\\/]node_modules[\\/](echarts|echarts-for-react|echarts-liquidfill)[\\/]/,
                },
                highcharts: {
                  name: 'highcharts',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]highcharts[\\/]/,
                },
                recharts: {
                  name: 'recharts',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]recharts[\\/]/,
                },
                draftjs: {
                  name: 'draftjs',
                  priority: 30,
                  test: /[\\/]node_modules[\\/](draft-js|react-draft-wysiwyg|draftjs-to-html|draftjs-to-markdown)[\\/]/,
                },
                async: {
                  chunks: 'async',
                  minChunks: 2,
                  name: 'async',
                  maxInitialRequests: 1,
                  minSize: 0,
                  priority: 5,
                  reuseExistingChunk: true,
                },
              },
            },
          },
        })
  },
}

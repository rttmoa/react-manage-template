"use strict"
const path = require('path')
const webpack = require('webpack')
const merge = require("webpack-merge") // 一个webpack配置合并模块, 与Object.assign()功能类似！
const HtmlWebpackPlugin = require("html-webpack-plugin") // 一个创建html入口文件的webpack插件！
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin") // 一个编译提示的webpack插件！
const notifier = require("node-notifier") // 发送系统通知的一个node模块！
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 开启 happyPack 的线程池

const devConf = require('./config').dev;
const styleLoader = require('./style-loader');
const webpackBaseConf = require('./webpack.base.conf');  



// TODO: 开发环境
// webpack-dev-server【devServer属性配置】: https://blog.csdn.net/qq_37833745/article/details/121289187
// 前端性能优化之首屏加载：https://zhuanlan.zhihu.com/p/448087825
const dev = merge(webpackBaseConf, {
    // webpackBaseConf: entry, resolve, module
    // dev: output, module, devtool, devServer, plugins

    // mode: "development",

    output: { 
        // filename: '[name]-[hash].js',
        //html引用资源路径,在dev-server中,引用的是内存中文件！
        publicPath: devConf.publicPath,

        // webpack5x-mobx-admin写法：
        // filename: '[name].[chunkhash:8].js', 
        // chunkFilename: 'chunk/[name].[chunkhash:8].js',
    },

    module: {
        rules: styleLoader.styleLoader({ extract: false, sourceMap: true })
    },

    // 生成sourceMaps(方便调试)
    // devtool: 'eval-source-map',
    devtool: devConf.devtoolType,

    // eslint: { configFile: '.eslintrc' }, // 配置eslint规则
    // postcss: [ require('autoprefixer') ], // 调用autoprefixer插件，例如 display: flex 对于浏览器加一些前缀

    // 启动一个express服务器,使我们可以在本地进行开发！！！
    devServer: {
        // port: 40005,
        hot: true, // 热加载
        inline: true, // 自动刷新
        open: true, // 自动打开浏览器
        historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        host: devConf.host, // 主机名
        port: devConf.port, // 端口号
        compress: true, // 为你的代码进行压缩。加快开发流程和优化的作用
        overlay: { // 在浏览器上全屏显示编译的errors或warnings。
            errors: true,
            warnings: false
        },
        quiet: true, // 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
        proxy: devConf.proxyTable, // 配置反向代理解决跨域
        // 接口代理转发": 例子
        // proxy: {
        //     '/testapi': {
        //     target: 'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
        //     changeOrigin: true,
        //     secure: false,
        //     pathRewrite: { '^/testapi': '' },
        //     },
        // },
    },
    // dev：可以写到common部分  开发生产环境公用
    plugins: [
        // 开启HMR(热替换功能,替换更新部分,不重载页面！)
        new webpack.HotModuleReplacementPlugin(),

        // 显示模块相对路径
        new webpack.NamedModulesPlugin(),

        // 配置html入口信息
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),

        // 编译提示插件
        new FriendlyErrorsPlugin({
            //编译成功提示！
            compilationSuccessInfo: {
                messages: [
                    `Your application is running here: http://${devConf.host}:${devConf.port}`
                ]
            },
            //编译出错！
            onErrors: function (severity, errors) {
                if (severity !== "error") return;
                const error = errors[0];
                const filename = error.file.split("!").pop();
                //编译出错时,右下角弹出错误提示！
                notifier.notify({
                    title: "xc-cli",
                    message: severity + ": " + error.name,
                    subtitle: filename || "",
                    icon: path.join(__dirname, "xc-cli.png")
                });
            }
        }),

        // 开启 happyPack 的线程池
        new HappyPack({
          id: 'happybabel',
          loaders: ['babel-loader?cacheDirectory=true'],
          threadPool: happyThreadPool,
          // cache: true,
          verbose: true,
        }),

        // 构建过程中复制文件和文件夹的功能。将某些静态资源复制到目标目录下
        // new CopyWebpackPlugin({
        //   patterns: [{
        //       from: `${srcDir}/assets/images/nowthen.jpg`,
        //       to: 'nowthen.jpg',
        //    }],
        // }),

        // dayjs-momentjs 性能优化...： https://segmentfault.com/a/1190000041629544?utm_source=sf-similar-article
        // new AntdDayjsWebpackPlugin(),

        // // 打开浏览器
        // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        // new webpack.DefinePlugin({
        //   // __DEV__：全局变量 判断的是 npm start/npm run build中执行的是哪个
        //   __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        // })

    ]
});

module.exports = dev;
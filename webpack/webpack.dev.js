/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const path = require('path')
const webpack = require('webpack')
    // 一个webpack配置合并模块, 与Object.assign()功能类似！
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin') // ! 热更新 react 组件
const portfinder = require('portfinder') // ! ”端口已被占用" 开放新的端口
    // const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
    // const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // ! 错误： 一个编译提示的webpack插件！
const notifier = require('node-notifier') // 发送系统通知的一个node模块！
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const devProxy = require('./dev.proxy')
    // 速度分析：https://tsejx.github.io/webpack-guidebook/best-practice/optimization/build-analyze#%E9%80%9F%E5%BA%A6%E5%88%86%E6%9E%90
const SMP = new SpeedMeasurePlugin()
const packageJson = require('../package.json')

// 精确的获取本机ip地址
function getIpAddress() {
    const interfaces = require('os').networkInterfaces()
        // console.log('interfaces', interfaces)
    for (const devName in interfaces) {
        const iface = interfaces[devName]
        for (let i = 0; i < iface.length; i += 1) {
            const alias = iface[i]
            if (
                alias.family === 'IPv4' &&
                alias.address !== '127.0.0.1' &&
                alias.address !== '2.0.0.1' &&
                alias.mac !== '00:00:00:00:00:00' &&
                !alias.internal
            ) {
                return alias.address
            }
        }
    }
}
// devServer: {
//   host: selfIp
// }
let selfIp
try {
    selfIp = getIpAddress()
        // console.log('selfIp', selfIp)
} catch (e) {
    selfIp = 'localhost'
}

// * Webpack 中文版:  https://www.webpackjs.com/configuration/
// * Webpack Guidebook：https://tsejx.github.io/webpack-guidebook/best-practice
const baseConfig = {
    //* 提供 mode 配置选项，告知 webpack 使用相应模式的内置优化
    mode: 'development',
    //* 选择一种 source map 风格来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。
    devtool: 'eval-cheap-module-source-map',

    // cache：缓存生成的 webpack 模块和 chunk，来改善构建速度。
    cache: {
        // type: 'memory', // 基于内存缓存;; 缓存生成的 webpack 模块和 chunk，来改善构建速度;;  在生产模式中被禁用。
        type: 'filesystem', // 优化：使用文件缓存，大幅提升二次构建速度、打包速度  (第一次49s，第二次14s)
        // 缓存失效
        // 方法一：cache.buildDependencies
        // version: `${packageJson.version}`, // 方法二：理论上每次升级工具包，就需要重新编译的，之前在一次本地测试时发现工具包升级后缓存没有失效
        // name: `${process.env.NODE_ENV || 'development'}-cache`, // 方法三：name 属性比较好的是可以保存多个缓存目录，例如通过 process.env.NODE_ENV 区分不同的环境。
    },

    // webpack-dev-server 可用于快速开发应用程序
    devServer: {
        // error: 指定静态资源的根目录，localhost:9000就可以直接访问public和dist里面的资源文件了
        // contentBase: path.resolve(__dirname, '../dist'),

        // 配置 allowedHosts 白名单列表，只有 HTTP 请求的 HOST 在列表里才能正常返回
        // allowedHosts: ['host.com', 'subdomain.host.com', 'subdomain2.host.com', 'host2.com', ],
        allowedHosts: 'all', // 该选项允许将允许访问开发服务器的服务列入白名单。
        historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        client: {
            logging: 'error', // 允许在浏览器中设置日志级别
            progress: true, // 在浏览器中以百分比显示编译进度
            overlay: {
                // ! 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
                errors: true,
                warnings: false,
            },
        },
        // 该配置项允许配置从目录提供静态文件的选项  直接访问public和dist里面的资源文件了
        static: {
            directory: path.join(__dirname, '../public'),
        },
        host: selfIp,
        compress: true, // 启用 gzip 压缩
        open: true, // 告诉 dev-server 在服务器已经启动后打开浏览器
        // 热更新:  指的是，在开发过程中，修改代码后，仅更新修改部分的内容，无需刷新整个页面。
        hot: true,
        proxy: devProxy, // 代理到后端服务器上
        // Service Workers 依赖 HTTPS，使用 DevServer 提供的 HTTPS 功能。
        // https: true,
    },

    // 文件监听：Webpack 可以使用两种方式开启文件监听：1、启动 Webpack 时配置 --watch 参数  2、在配置文件中设置 watch: true
    watch: true,
    // Webpack 可以监听文件变化，当它们修改后会重新编译（需要配置watch=true）
    watchOptions: {
        aggregateTimeout: 1000, // 文件变动后多久发起构建，越大越好
        poll: 1000, // 每秒询问变动次数，越小越好
        ignored: /node_modules/, // 设置不监听的文件目录，排除 node_modules 后可以显著减少 Webpack 消耗的内存
    },
    // 这些选项决定了如何处理项目中的不同类型的模块。
    module: {
        rules: [{
            test: /\.(js|ts|jsx|tsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
                },
            }, ],
        }, ],
    },
    plugins: [
        // 热更新插件：开启HMR，只更新修改的部分、不重载页面！（设置 hot: true）
        new webpack.HotModuleReplacementPlugin(),
        // 热更新 react 组件
        new ReactRefreshWebpackPlugin({ overlay: false }),

        // 生成 Chrome 配置文件，其中包括插件执行的时间。
        // https://www.webpackjs.com/plugins/profiling-plugin/
        new webpack.debug.ProfilingPlugin({
            outputPath: path.join(__dirname, 'profiling/profileEvents.json'),
        }),

        // 定义全局变量：（可以在模块中直接使用这些变量，无需任何声明 console.log(process.env.NODE_ENV)）
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
            'typeof window': JSON.stringify('object'),
            __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'dev' || 'false')), // __DEV__：全局变量 判断的是 development 还是 production
        }),

        // ! 优化：15、DLLPlugin (比如react-icons)： https://blog.51cto.com/u_15809510/5968219
        // 告诉webpack,哪些第三方库。不需要打包了
        // new webpack.DllReferencePlugin({
        //   manifest: path.resolve(__dirname, '../src/resource/dll/vendor.manifest.json'),
        // }),
        // 将dll打包的文件输出出去，并自动在html中引入
        // new AddAssetHtmlWebpackPlugin({
        //   filepath: path.resolve(__dirname, '../src/resource/dll/vendor.dll.js'),
        // }),

        // !~ 已移除： 编译提示插件
        // new FriendlyErrorsPlugin({
        //   // 编译成功提示！
        //   compilationSuccessInfo: {
        //     messages: [`Your application is running here:  http://${selfIp}:${8080}`],
        //   },
        //   // 编译出错！
        //   onErrors(severity, errors) {
        //     if (severity !== 'error') return
        //     const error = errors[0]
        //     const filename = error.file.split('!').pop()
        //     // 编译出错时,右下角弹出错误提示！
        //     notifier.notify({
        //       title: 'xc-cli',
        //       message: `${severity}: ${error.name}`,
        //       subtitle: filename || '',
        //       icon: path.join(__dirname, 'xc-cli.png'),
        //     })
        //   },
        // }),
        new webpack.BannerPlugin('版权所有，翻版必究'),

        // // 优化：为网页应用增加离线缓存功能  (https://github.com/oliviertassinari/serviceworker-webpack-plugin)
        // new ServiceWorkerWebpackPlugin({
        //   entry: path.join(__dirname, 'sw.js'),
        // }),
    ].filter(Boolean),

    // ! 从 webpack 4 开始，会根据你选择的 mode 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。
    optimization: {
        removeAvailableModules: false, // 如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块。
        removeEmptyChunks: false, // 如果 chunk 为空，告知 webpack 检测或移除这些 chunk
        splitChunks: false,
        minimize: false, // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。
        concatenateModules: false, // 告知 webpack 去寻找模块图形中的片段，哪些是可以安全地被合并到单一模块中
        usedExports: false, // 告知 webpack 去决定每个模块使用的导出内容。
    },
}

// 速度分析：可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
const webpackConfig = SMP.wrap(baseConfig)

const devWebpackConfig = merge(commonConfig, webpackConfig)

// /如果端口被占用，重新设置个端口
module.exports = new Promise((resolve, reject) => {
    portfinder.getPort({
            port: 8080, // 默认8080端口，若被占用，重复+1，直到找到可用端口或到stopPort才停止
            stopPort: 65535, // maximum port
        },
        (err, port) => {
            if (err) {
                reject(err)
                return
            }
            devWebpackConfig.devServer.port = port
            resolve(devWebpackConfig)
        }
    )
})
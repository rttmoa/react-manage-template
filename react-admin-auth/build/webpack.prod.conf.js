"use strict";
const path = require('path')
const webpack = require('webpack')
const merge = require("webpack-merge"); // 一个webpack配置合并模块, 与Object.assign()功能类似！
// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 一个创建html入口文件的webpack插件！
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 一个抽离出css的webpack插件！
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin"); // 一个压缩css的webpack插件！
const CopyWebpackPlugin = require("copy-webpack-plugin"); // 一个拷贝文件的webpack插件！

// Import
const styleLoader = require('./style-loader')
const prodConf = require('./config').build //生产环境配置参数
const baseConf = require('./webpack.base.conf') //webpack基本配置

// 资源路径
const assetsPath = (dir) => {
    return path.posix.join(prodConf.assetsSubDirectory, dir)
}
console.log(process.env.NODE_ENV)

const prod = merge({}, baseConf, {
    output: {
        // Build后所有文件存放的位置
        path: path.resolve(__dirname, '../dist'),

        // html引用资源路径,可在此配置cdn引用地址！
        publicPath: prodConf.publicPath,

        // 文件名 （表示 js 目录下）
        filename: assetsPath('js/[name].[chunkhash:8].file.js'),

        // 用于打包require.ensure(代码分割)方法中引入的模块
        chunkFilename: assetsPath('js/[name].[chunkhash:5].chunk.js')
    },
    module: {
        rules: styleLoader.styleLoader({
            extract: true,
            sourceMap: true
        })
    },
    plugins: [

        // 抽离CSS （分离CSS和JS文件）
        // new ExtractTextPlugin('[name].[chunkhash:8].css'), 
        // new ExtractTextPlugin('styles.[contenthash:8].css'), 
        // new ExtractTextPlugin({ filename: `[name]_[md5:contenthash:hex:8].css` }),
        new ExtractTextPlugin({ filename: assetsPath('css/[name].[contenthash].css') }),

        //压缩css
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),

        //删除类似的重复代码  
        new webpack.optimize.DedupePlugin(),

        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            parallel: true, // 使用多进程并行运行来提高构建速度
            compress: {
                warnings: false,
                drop_console: true, // 打包后去除console.log
                pure_funcs: ['console.log']
            },
            sourceMap: true
            // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
        }),

        //作用域提升,提升代码在浏览器执行速度
        new webpack.optimize.ModuleConcatenationPlugin(),

        //根据模块相对路径生成四位数hash值作为模块id
        new webpack.HashedModuleIdsPlugin(),

        //将整个文件复制到构建输出指定目录下
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "../static"),
            to: prodConf.assetsPath,
            ignore: [".*"]
        }]),


        // 第三方库chunk （提供公共代码）
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor',filename: '[name].[chunkhash:8].js' }),
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor',filename: 'javascript.[chunkhash:8].js' }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                //在node_modules的js文件!
                return (
                    module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
                );
            }
        }),

        // 利用一个 manifest 来记录 vendor 的 id, 如果vendor没改变，则vendor不需要重新打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor'],
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: 2,
        //     // chunks: ['app']
        // }),


        // html配置
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'index.html',
            // favicon: path.resolve(__dirname, '../favicon.ico'),
            inject: true,
            //压缩配置
            minify: {
                //删除Html注释
                removeComments: true,
                //去除空格
                collapseWhitespace: true,
                //去除属性引号
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
        })
    ],
    // optimization: {
    //     splitChunks: {
    //         chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为⼀个单独的⽂件
    //     },
    // },
    // webpack5x-mobx-admin写法：
    // optimization: {
	// 	splitChunks: {
	// 		chunks: "all",   // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
	// 		minSize: 30000,   // （默认值：30000）块的最小大小
	// 		minChunks: 1,    // （默认值：1）在拆分之前共享模块的最小块数
	// 		maxAsyncRequests: 5,   //（默认为5）按需加载时并行请求的最大数量
	// 		maxInitialRequests: 3,  //（默认值为3）入口点的最大并行请求数
	// 		automaticNameDelimiter: '~',  // 默认情况下，webpack将使用块的来源和名称生成名称，例如vendors~main.js
	// 		name: true,
	// 		cacheGroups: {  // 以上条件都满足后会走入cacheGroups进一步进行优化的判断
	// 			vendors: {
	// 				test: /[\/]node_modules[\/]/,  // 判断引入库是否是node_modules里的
	// 				priority: -10,   // 数字越大优先级越高 （-10大于-20）
	// 				filename: 'vendors.js'  // 设置代码分割后的文件名
    //     		},
	// 			default: {   //所有代码分割快都符合默认值，此时判断priority优先级
	// 				minChunks: 2,  
	// 				priority: -20,
	// 				reuseExistingChunk: true   // 允许在模块完全匹配时重用现有的块，而不是创建新的块。
	// 			}
	// 		}
    // 	}
	// },
})

if (prodConf.productionGzip) { //是否开启Gzip压缩
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    prod.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp( '\\.(' + prodConf.productionGzipExtensions.join('|') +')$'),
            threshold: 10240, //只有大小大于该值的资源会被处理。默认值是 0
            minRatio: 0.8 //只有压缩率小于这个值的资源才会被处理,默认值是 0.8
        })
    )
}

// 查看打包内容
if (process.env.analyz_npm_config_report) { // build: report
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    prod.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = prod
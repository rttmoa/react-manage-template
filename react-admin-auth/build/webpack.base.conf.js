'use strict'
const path = require('path')
const prodConf = require('./config').build
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 拼接路径 
const resolve = (dir) => {
    return  path.join(__dirname, '..', dir)
}
// 资源路径 
const assetsPath = (dir) => {
    return path.posix.join(prodConf.assetsPath, dir)
} 
// const srcDir = path.join(__dirname, '../src');
// const srcDir = path.resolve(__dirname, '../src');
// const devMode = process.env.NODE_ENV !== 'production';



/** #### Module: {entry, resolve, module}  */
module.exports = {

    entry: {
        // app: './src/main.js',
        // webpack5x-mobx-admin写法：
        app: path.join(__dirname, "../src/main.js") 
    },

    // 配置模块如何被解析
    resolve: {
        // 自动解析文件扩展名(补全文件后缀)(从左->右)
        // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
        extensions: [".js", ".jsx", ".json"],

        // 配置别名映射
        alias: {
            'src': resolve('src'),
            'assets': resolve('src/assets'),
            'components': resolve('src/components'),
            'views': resolve('src/views'),
            'actions': resolve('src/actions'),
            'router': resolve('src/router'),
            'reducers': resolve('src/reducers'),
            'utils': resolve('src/utils'),
            'store': resolve('src/store'),
            'connect': resolve('src/utils/connect'),
            // webpack5x-mobx-admin写法：
            // '@': path.resolve(__dirname, '../src'),
            // '@pages': `${path.resolve(__dirname, '../src')}/pages`
        }
    },

    // 处理模块的规则(可在此处使用不同的loader来处理模块！)
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 资源路径
                loader: 'babel-loader', // 该路径执行的loader
                include: resolve("src"), // 指定哪个文件loader
                exclude: /(node_modules|bower_components)/,
                // use: ['happypack/loader?id=happybabel'],
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'postcss-loader',
            //         'less-loader',
            //     ],
            //     },
            //     {
            //     test: /\.css$/,
            //     use: [
            //         devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'postcss-loader',
            //     ],
            // },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                // use: ['url-loader'],
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                },
                include: [path.resolve(__dirname, '../src')],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                // use: ['url-loader'],
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                },
                include: [path.resolve(__dirname, '../src')],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                // use: ['url-loader'],
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                },
                include: [path.resolve(__dirname, '../src')],
            }
        ]
    },

    // plugins: [
    //     new webpack.DllReferencePlugin({
    //         context: path.resolve(__dirname, '..'),
    //         // manifest: require('./manifest.json')
    //     })
    // ]
}
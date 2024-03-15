/* eslint-disable prettier/prettier */
const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin")

// webpack之Dll动态代码分割优化： https://zhuanlan.zhihu.com/p/375833496
// dll：dist里面只有两个文件，一个index.html和main.js, 会发现main.js里面把react和react.dom都构建进去了，导致main.js包文件很大，且每次打包都需从新打包进去，我们知道，第三方库，我们肯定都不会去修改，能不能一次打包后，后面就不再去打包呢，这就是我们要说的dll。


/**
 * dll：webpack5 开箱即用的持久缓存是比 dll 更优的解决方案。
 * 所以，不用再配置 dll 了，上面介绍的 cache 明显更香。
 *
 * 可以测试使用dll.js: https://tsejx.github.io/webpack-guidebook/best-practice/optimization/precompile
 */
module.exports = {
  mode: 'production',
  // 第三方库生成的文件名：
  // vendor.dll.js
  // redux.dll.js
  entry: {
    // vendor自定义名称，数组是需要分离出来的第三方库
    // vendor: [
    //   // '@babel/polyfill',
    //   'react',
    //   'react-dom',
    //   'react-router',
    //   'axios',
    //   'lodash',
    // ],
    // redux: [
    //   'redux',
    //   'redux-thunk',
    //   'react-redux',
    // ],
    library: ['react','react-dom','react-router','redux','redux-thunk','react-redux']
  },
  // devtool: 'source-map',
  output: {
    // 输出文件名称
    filename: '[name].dll.js',
    // 输出一个dll文件夹
    path: path.join(__dirname, '../build/dll'),
    // 暴露出去的名称，意思构建出来的包赋值给[name]_library,这里就是var vendor_library = 构建出来的包
    library: '[name]_[hash]',
  },
  performance: false,
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, '../build')],
      verbose: true,
    }),
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: true,
    }),

    // 使用插件 DllPlugin； 作用：将上面的第三方库分离出来
    new webpack.DllPlugin({
      // manifest.json是构建的js包的映射关系文件
      path: path.join(__dirname, '../build/dll', '[name].manifest.json'),
      // 对应上面的library
      name: '[name]_[hash]',
      context: __dirname,
    }),

    // 文件路径与 DllPlugin 输出的位置要一致
    // new AddAssetHtmlPlugin([{ filepath: path.resolve(__dirname, '../build/dll/*.dll.js') }]),
  ],
}

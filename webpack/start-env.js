const merge = require('webpack-merge')

const baseConfig = require('./webpack.base.conf')
const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')

/**
 * package 入口文件
 */
// console.log("process.env.NODE_ENV", process.env.NODE_ENV)
// eslint-disable-next-line camelcase
module.exports = function start_env(process_Env_NODE_ENV) {
  console.log(process_Env_NODE_ENV)
  let environment = process.env.NODE_ENV
  console.log(environment)
  console.log('env', process.env.NODE_ENV)
  if (environment && environment === 'production') {
    console.log('生产环境')
    environment = undefined
    return merge({}, baseConfig, prodConfig)
  }
  console.log('开发环境')
  environment = undefined
  return merge({}, baseConfig, devConfig)
}

// const { merge } = require('webpack-merge') // npm install webpack-merge -D
// const commonConfig = require('./webpack.config.common')
// const productionConfig = require('./webpack.config.prod')
// const developmentConfig = require('./webpack.config.dev')
// /**
//  * ! 统一执行 webpack 文件，去执行开发还是生产环境 (未使用)
//  * 运行：webpack -c ./webpack.config.js  --env development
//  * 参考：https://www.yuque.com/yuqueyonghua2m9wj/web_food/ler3mg32asyiodg8#FxgEj
//  */
// module.exports = (env) => {
//   switch (true) {
//     case env.development:
//       return merge(commonConfig, developmentConfig)
//     case env.production:
//       return merge(commonConfig, productionConfig)
//     default:
//       console.error('无法识别 env 环境')
//       break
//   }
// }


const merge = require("webpack-merge")



const baseConfig = require("./webpack.base.conf")
const devConfig = require("./webpack.dev")
const prodConfig = require("./webpack.prod")

// console.log("process.env.NODE_ENV", process.env.NODE_ENV)
module.exports = function (process_Env_NODE_ENV) { 
  let environment = process.env.NODE_ENV;
  console.log(environment)
  // console.log("sss", process.env.NODE_ENV)
  if (environment && environment === "production") {
    console.log("生产环境")
    environment = undefined;
    return merge({}, prodConfig)
  } else {
    console.log("开发环境")
    environment = undefined;
    return merge({}, devConfig)
  }
}
// ()
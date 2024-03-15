'use strict'

process.env.NODE_ENV = 'production'
const ora = require('ora') // 用于快速创建和展示终端Loading动画（Loading）
const { rimraf } = require('rimraf') // 用于删除dist目录里的旧文件 （删除文件）
const chalk = require('chalk') // 用于console.log() 的输出信息配置不同的显示颜色和样式（打印信息颜色）https://blog.51cto.com/u_14785218/5966504
const path = require('path') // 用于处理文件路径（路径） https://blog.csdn.net/m0_52040370/article/details/126567129
const webpack = require('webpack')

const rmFile = path.resolve(__dirname, '../dist/') // 删除指定的文件
const spinner = ora('building for production...') // build start loading
spinner.start()

const productionConfig = require('./webpack.prod')

/**
 * ! 生产环境 （废弃）
 *  yarn build
 *  构建全量压缩包！
 */
// build-prod.js
// Package.json
// "build": "cross-env SENTRY_SOURCE_MAP=no BUILD_GOAL=production NODE_ENV=production USE_ANALYZE=1 webpack --config ./webpack/webpack.build.js --stats-error-details --profile --json=compilation-stats.json",
rimraf(rmFile).then((result, err) => {
  if (err) {
    console.error('rmFile-error')
    throw err
  }
  if (result) {
    webpack(productionConfig, (error, stats) => {
      spinner.stop()
      if (error) {
        console.error('production-error')
        throw error
      }
      process.stdout.write(
        `${stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        })}\n\n`
      )

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))

      console.log(
        chalk.yellow(
          '  Tip: built files are meant to be served over an HTTP server.\n' +
            "  Opening index.html over file:// won't work.\n"
        )
      )
    })
  }
})

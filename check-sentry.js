const { execSync } = require('child_process')
const { existsSync } = require('fs')
const { join } = require('path')

const basePath = process.cwd()
function getJoinPath(relativePath) {
  return join(basePath, relativePath)
}
const sentryCliBinPath = getJoinPath('./node_modules/.bin/sentry-cli')
const nodeModulesSentryInstallPath = getJoinPath('./node_modules/@sentry/cli/scripts/install.js')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const SLEEP_TIME = 10000

async function checkSentry() {
  const stdio = ['ignore', 'inherit', 'ignore']
  console.log('sentryCliBinPath', existsSync(sentryCliBinPath))
  if (existsSync(sentryCliBinPath)) {
    try {
      console.log('sentryCliBinPath -V', `${sentryCliBinPath} -V`)
      execSync(`${sentryCliBinPath} -V`, { stdio })
    } catch (error) {
      console.log('nodeModulesSentryInstallPath', existsSync(nodeModulesSentryInstallPath))
      if (existsSync(nodeModulesSentryInstallPath)) {
        execSync(`node ${nodeModulesSentryInstallPath}`)
        await sleep(SLEEP_TIME)
        console.log('睡眠')
        execSync(`${sentryCliBinPath} -V`, { stdio })
      }
    }
  }
}

checkSentry()

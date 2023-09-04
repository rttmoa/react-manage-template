

// TODO: webpack 读取此文件
// 项目出口,webpack-dev-server 生成的包并没有写入硬盘,而是放在内存中！
module.exports = {
    // webpack 开发环境配置
    dev: {
        env: 'development',
        publicPath: '/',
        host: 'localhost',
        port: '40002',
        assetsSubDirectory: 'static',
        devtoolType: 'cheap-module-eval-source-map',
        proxyTable: {}
    },
    // webpack 生产环境配置
    build: {
        env: 'production',
        publicPath: './',
        assetsPath: 'static',
        assetsSubDirectory: 'static',
        devtoolType: 'source-map',
        productionGzip: true,
        productionGzipExtensions: ['js', 'css']
    }
}
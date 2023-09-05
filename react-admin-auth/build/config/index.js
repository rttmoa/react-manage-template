

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
        // devtoolType: 'eval-source-map',
        // devtoolType: 'null',
        proxyTable: {},
        proxyProps: {
            '/testapi': {
                target: 'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/testapi': '' },
            },
        }
    },
    // webpack 生产环境配置
    build: {
        env: 'production',
        publicPath: './',
        // assetsPath: 'static', // 表示打包在 /dist/static/ 目录下
        assetsPath: '',
        assetsSubDirectory: 'static',
        devtoolType: 'source-map',
        productionGzip: true,
        productionGzipExtensions: ['js', 'css']
    }
}
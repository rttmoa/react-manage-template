//antd 的主题配置
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {'@primary-color': '#1DA57A'},
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
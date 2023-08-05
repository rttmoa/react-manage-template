const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { themeColor } = require('../src/settings.json');

const ArcoDesignWebpackPlugin = require('@arco-design/webpack-plugin');

exports.site = (config, env) => {
  config.context = path.resolve(__dirname, '..');
  config.entry = path.resolve(__dirname, '../src/index');
  config.output.path = path.resolve(__dirname, '../dist');

  config.plugins[0] = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
  });
  config.plugins.push(new ForkTsCheckerWebpackPlugin());

  config.resolve.modules = ['node_modules'];

  config.plugins.push(
    new ArcoDesignWebpackPlugin({
      modifyVars: {
        ...(themeColor ? { 'arcoblue-6': themeColor } : {}),
      },
    })
  );
  // TODO: devserver配置：https://blog.csdn.net/Ripe_L/article/details/126185028
  config.devServer = {
    open: true,
    hot: true,
    // contentBase: path.join(__dirname, "./dist"),
    host: "0.0.0.0", // 可以使用手机访问
    port: 8080,
    // historyApiFallback: true, // 该选项的作用所有的404都连接到index.html 
    proxy: {
      '/api/v1': 'http://127.0.0.1:7001',
    },
  };
};

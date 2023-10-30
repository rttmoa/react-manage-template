/* eslint valid-jsdoc: "off" */

'use strict';
const userConfig = require('./config.user');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// ! 环境配置：https://www.eggjs.org/zh-CN/basics/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1640431712552_1460';

  // ! 在这里添加您的中间件配置
  config.middleware = [ 'errorHandler', 'auth' ];

  // 模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // csrf安全
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 文件
  // config.multipart = {
  //   mode: "file",
  //   fileExtensions: [".md"], // 增加对 md 扩展名的文件支持
  // };

  // TODO: session配置
  config.session = {
    key: 'BLOG_EGG_SESSION_KEY',
    encrypt: false,
  };

  // TODO: 连接mongodb地址
  config.mongoose = {
    url: 'mongodb://127.0.0.1/blog',
    options: {},
  };

  config.jwt = {
    secret: userConfig.userName,
  };

  config.auth = {
    whiteList: [ userConfig.userName ],
  };

  return {
    ...config,
    ...userConfig,
  };
};

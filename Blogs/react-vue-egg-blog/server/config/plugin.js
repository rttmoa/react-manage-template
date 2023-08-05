'use strict';

/** @type Egg.EggPlugin */
// TODO: Plugin: https://www.eggjs.org/basics/plugin
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

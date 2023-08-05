/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
module.exports = app => {
  app.once('server', server => {
    // websocket
    console.dir('(===================================================服务已开启====================================================================)');
    // console.log('server ==> ', server);
  });
  app.on('error', err => {
    // console.error('error ========> ', err);
  });
  app.on('request', ctx => {
    // console.log('request ========> ', ctx);
  });
  app.on('response', ctx => {
    // console.log('response ========> ', ctx);
  });
};

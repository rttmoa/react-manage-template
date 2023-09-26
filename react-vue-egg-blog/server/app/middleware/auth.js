/* eslint-disable strict */
module.exports = () => {
  return async function auth(ctx, next) {
    console.dir('(************************************************************** 中 间 件 权限************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ )');
    const currentUrl = ctx.request.url;
    if (currentUrl.indexOf('/web') > -1) {
      return await next();
    }

    // 后台校验用户访问权限。
    const urlWhiteList = [ '/admin/login', '/admin/logout' ];
    const whiteList = ctx.app.config.auth.whiteList; // ['admin']
    const secret = ctx.app.config.jwt.secret;

    const isNoValidate = urlWhiteList.some(
      item => currentUrl.indexOf(item) > -1
    ); // 是否不需要验证，如果currentUrl在urlWhiteList里面就不需要验证
    if (isNoValidate) {
      return await next();
    }
    const authorization = ctx.request.header.authorization;
    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      const decode = await ctx.app.jwt.verify(token, secret);
      const userName = decode._doc.userName;
      if (whiteList.includes(userName)) {
        await next();
      } else {
        ctx.helper.success({
          ctx,
          res: {
            status: 403,
            msg: '无权限访问',
            code: 0,
            data: null,
          },
        });
      }
    } else {
      await next();
    }
  };
};

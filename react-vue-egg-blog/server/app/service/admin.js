/* eslint-disable strict */
const Service = require('egg').Service;

class AdminService extends Service {


  async adminLogin(params) { // 登陆
    const { ctx, app } = this;
    // console.log('admin Service');
    // const old = await ctx.model.Admin.findOne({})
    const oldUser = await ctx.model.Admin.findOne({ userName: params.userName });
    // console.log(oldUser); // null
    if (!oldUser) return { msg: '用户不存在' };

    const isMatch = await ctx.helper.comparePassword(params.password, oldUser.password);
    if (!isMatch) return { msg: '用户名或密码错误' };

    const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, { expiresIn: '1h' });
    console.log('token', token);
    ctx.cookies.set('token', token, {
      maxAge: 86400000,
      httpOnly: true,
    });
    return {
      data: {
        token,
        userName: oldUser.userName,
      },
      msg: '登录成功',
    };
  }


  async adminLogout() { // 退出
    const { ctx } = this;
    ctx.cookies.set('token', '', { maxAge: 0 });
    return {
      msg: '退出成功',
    };
  }
}

module.exports = AdminService;

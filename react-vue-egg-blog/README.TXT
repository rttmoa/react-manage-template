Video：https://www.bilibili.com/video/BV19Y411x76v
gitee：https://gitee.com/xuwenliu/projects
gitee地址：https://gitee.com/xuwenliu/class
Document：https://www.showdoc.com.cn/1520731920996915/
 


? web:
安装：npm install
启动: npm run serve
前台访问地址：http://localhost:8081/  



? admin:
安装：npm install
启动：npm run dev
后台访问地址：http://127.0.0.1:8080/ 
登录用户名密码: admin 123456

? server:
安装：npm install
启动：npm run dev
数据库：mongodb://127.0.0.1/blog
后台访问地址：http://127.0.0.1:7002/
数据库连接：  mongodb://127.0.0.1/blog



? 项目概括
vue：vue2 + vue-router3 + muse-ui
react：react16 + react-router5 + redux4 + typescript3 + arco-design
egg：egg + mongoose
前台渲染假数据，后台调用服务端



! server
Egg + MongoDb
app
  /controller
    admin.js
  /extend
    application.js
    helper.js
  /middleware
    auth.js
    error_handler.js
  /model
    admin.js
  /schedule
    audit.js
    console.js
  /service
    admin.js
  router.js
config
  一、测试 Admin 模块 （登陆与退出）
    1、Navicat数据库blog 表admin 找到用户名和密码
    2、Admin模块的登陆与退出功能包含的部分
    3、app/controller/admin.js
    4、ctx.validate(this.createRule, ctx.request.body) （config/plugin.js）
    5、auth.js (config.middleware = [ 'errorHandler', 'auth' ];  拦截路由)
    6、const res = await service.admin.adminLogin(ctx.request.body);
    7、ctx.helper.success({ ctx, res });
    8、使用 Apifox 创建请求并发送






### README.md
#### 介绍
class

#### 软件架构
软件架构说明

#### 安装教程
1. xxxx
2. xxxx
3. xxxx

#### 使用说明
1. xxxx
2. xxxx
3. xxxx

#### 参与贡献
1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

#### 特技
1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5. Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
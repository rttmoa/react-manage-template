##  二、环境参数

1. **前端技术：`node + react16 + redux3 + react-router3 + webpack4 + axios + less2 + antd3 + WEBPACK`**
2. **后端技术：`mock`**

## 功能一览

- [√] 登录，以及登录权限控制
- [√] 项目公用npm模块dll化
- [√] redux完整示范
- [√] mockjs模拟后端返回接口
- [√] axios异步请求跨域的设置
- [√] 实时的webpack包大小预览,方便优化
- [√] draftjs编辑器
- [√] echarts可视化

## screenshots

### login

最后的构建命令

```
npm run build (正式环境的打包部署)
npm run testing (测试环境的打包部署命令，可以根据具体需求自行配置修改)

```

服务端返回的数据格式也是标准的json，如下所示

```
{
  data: {
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    'list': [
    ],
  },
  msg: '',
  status: 1,
}

```

所有异步请求返回都会经过configs里面的ajax.js做处理，如果请求没有任何问题，那status返回值是1；
如果请求错误，比如说参数错误或者其他报错之类的，那status返回值就是0；
如果status值是-1，表示登录超时，那么就会跳出登录。
这些参数都可以根据实际情况进行调整，报错或者成功的提示信息放在msg里面返回。
当前项目集成了完整的用户管理、角色管理、模块管理等基本的权限管理功能，小伙伴们一定要同时启动npm run mock才可以看到噢

这个react的项目我有在跟nodejs的express框架配合做接口的开发，可以不靠后端输出数据库真实的数据，仓库地址在

```
https://github.com/duxianwei520/express

```

还有一个原生的nodejs版本的，仓库库地址是

```
https://github.com/duxianwei520/node

```

基本功能差不多，目前实现了注册登录以及获取用户信息等3个接口的真实api

## 说明

> 如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

### 大部分人项目启动不起来的原因，绝大部分的情况都是npm依赖包安装的时候有些依赖包没有下载完全，当前的demo肯定是可以跑起来的

### 取消http请求示例：

```
 import axios from 'axios'
const axiosHandle = axios.CancelToken.source()

login(){
  this.props.dispatch(fetchLogin(values, (res) => {},(error)=>{},axiosHandle)
  取消请求的操作
  setTimeout(() => {
    axiosHandle.cancel('手动取消。')
  }, 3000)
}

```

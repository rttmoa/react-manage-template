

let data = {id:3,name:"sam",age:36};
data = JSON.stringify(data);


// 配置需要展示在侧边栏的项，目前只支持2级，多级需要修改路由部分、面包屑部分
const menuConfig = [
  {
    title: '首页',
    key: '/',
    icon: 'home'
  },
  {
    title: '用户',
    key: '/user',
    icon: 'user',
    children: [
      {
        title: '联系',
        key: '/user/connect',
      },
      {
        title: '用户列表',
        key: '/user/list',
      },
    ]
  },
  {
    title: '组件',
    key: '/tool',
    icon: 'build',
    children: [
      {
        title: '富文本',
        key: '/tool/rich',
      }
    ]
  },
  {
    title: '路由',
    key: '/route',
    icon: 'build',
    children: [
      {
        title: 'params',
        key: '/route/zhangsan'
      },
      {
        title: 'paramsData',
        key: `/route/${data}`
      }
    ]
  }
];

export default menuConfig;

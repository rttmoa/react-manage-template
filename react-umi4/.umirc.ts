import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },

  proxy: {
    '/typicode': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },

  // mock: false, // 开启/关闭mock 或 在环境变量中关闭MOCK=none umi dev

  // 路由配置 信息数组
  // path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后
  routes: [
    {
      path: '/',
      redirect: '/home', // 重定向 /home
    }, 
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: '@/pages/Table',
      // component: '@/pages/Table/t.tsx', // ! 约定式路由， 具体文件夹下哪个文件
      layout: true // ! 是否全屏： 通过配置 layout: false 可以单独关闭某一个路由的全局布局
    },
    {
      name: 'CC',
      path: '/c',
      component: null,
    },
    {
      name: "userId",
      path: "/users/:id",
      component: null
    },
    // 兜底路由
    // 在使用约定式路由时，该文件会自动被注册为全局 404 的 fallback 页面
    { path: '/*', component: '@/pages/404.tsx' }
  ],
  npmClient: 'pnpm',
});


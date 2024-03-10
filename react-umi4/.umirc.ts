import { defineConfig } from '@umijs/max';
import path from 'path';

export default defineConfig({
  outputPath: 'dist',
  alias: {
    '@': `${path.resolve(__dirname, './src')}`,
  },
  // base: './',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  cacheDirectoryPath: `${path.resolve(__dirname, './node_modules/.cache')}`,
  // copy: [{ from: '', to: '' }], // 复制静态文件 （必须写入从哪个目录或者文件去复制）
  cssMinifier: 'esbuild', // CSS 压缩工具: 类型：string 可选的值：esbuild, cssnano, parcelCSS, none
  cssMinifierOptions: {
    // cssMinifier CSS 压缩工具配置选项
    minifyWhitespace: true,
    minifySyntax: true,
  },
  cssPublicPath: './', // 为 CSS 中的图片、文件等外部资源指定自定义公共路径
  // deadCode: {}, // 检测未使用的文件和导出，仅在 build 阶段开启。 (有问题)
  // define: { 'process.env.NODE_ENV' : process.env.NODE_ENV, },
  clickToComponent: { editor: 'vscode' }, // 开启后，可通过 Option+Click/Alt+Click 点击组件跳转至编辑器源码位置
  // ! 设置哪些模块不打包 (react)  https://umijs.org/docs/api/config#externals
  // externals: { react: 'React' },
  // // 配置 <head> 中的额外 script: https://umijs.org/docs/api/config#headscripts
  // headScripts: [
  //   'https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js',
  // ],
  // icons: { autoInstall: {} }, // 在 umi 配置文件设置，开启 icons 功能，并允许自动安装图标库  https://umijs.org/docs/api/config#icons
  hash: true,
  jsMinifier: 'esbuild', // 配置构建时压缩 JavaScript 的工具: 类型：string，可选值 esbuild, terser, swc, uglifyJs, none
  // jsMinifierOptions // jsMinifier 的配置项: https://umijs.org/docs/api/config#jsminifieroptions
  // legacy;  // ! 当你需要兼容低版本浏览器时，可能需要该选项   https://umijs.org/docs/api/config#legacy
  manifest: { fileName: "asset-manifest.json", basePath: 'asset/' },
  srcTranspiler: "babel", // 配置构建时转译 js/ts 的工具.  类型：string 可选的值：babel, swc, esbuild  https://umijs.org/docs/api/config#srctranspiler
  targets: { ie: 11 }, // 配置需要兼容的浏览器最低版本。Umi 会根据这个自定引入 polyfill、配置 autoprefixer 和做语法转换等。
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  }, 
  // https://umijs.org/docs/api/config#proxy
  proxy: {
    '/typicode': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },

  // mock: false, // 开启/关闭mock 或 在环境变量中关闭MOCK=none umi dev

  // 路由配置 信息数组
  // path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后
  // https://umijs.org/docs/api/config#routes
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
      layout: true, // ! 是否全屏： 通过配置 layout: false 可以单独关闭某一个路由的全局布局
    },
    {
      name: 'CC',
      path: '/c',
      component: null,
    },
    {
      name: 'userId',
      path: '/users/:id',
      component: null,
    },
    // 兜底路由
    // 在使用约定式路由时，该文件会自动被注册为全局 404 的 fallback 页面
    { path: '/*', component: '@/pages/404.tsx' },
  ],
  npmClient: 'pnpm',
});

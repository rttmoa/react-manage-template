/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react' // ! 使用 Babel 的官方 React 支持
import vitePluginImp from 'vite-plugin-imp' // ! 按需导入库组件样式，让你的应用更轻薄。
import svgr from 'vite-plugin-svgr' // ! 将 SVG 转换为 React 组件。
import visualizer from 'rollup-plugin-visualizer'
// import { sentryVitePlugin } from '@sentry/vite-plugin'


// Vite Config: https://cn.vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src/'),
      '@stateless': path.resolve(__dirname, './src/components/stateless/'),
      '@stateful': path.resolve(__dirname, './src/components/stateful/'),
      '@hooks': path.resolve(__dirname, './src/components/hooks/'),
      '@container': path.resolve(__dirname, './src/components/container/'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routers': path.resolve(__dirname, './src/routers'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@theme': path.resolve(__dirname, './src/theme'),
    },
  },
  plugins: [
    react({
      // 在所有 *.jsx 和 *.tsx 文件中使用 React 插件
      include: '**/*.{jsx,tsx}',
    }),
    svgr(),
    visualizer(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => name !== 'theme' && `antd/es/${name}/style`,
        },
      ],
    }),
    // createHtmlPlugin({
    //   inject: {
    //     data: {
    //       title: 'Pro React Vite',
    //       favicon: path.resolve(__dirname, './public/favicon.ico'),
    //     },
    //   },
    // }),
    // sentryVitePlugin({
    //   org: 'wkylin',
    //   project: 'promotion-web',
    //   authToken: '73acdaa05e174744804f105c6e3365533e42da87ada6496bbc42d5a208f23a31',
    //   sourcemaps: {
    //     assets: './dist/**',
    //   },
    // }),
  ],
  // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
  define: {
    process, // 解决未定义问题，推荐 import.meta.env
  },
  css: {
    // 配置 CSS modules 的行为。选项将被传递给 postcss-modules。
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#4377FE', // 设置antd主题色
        },
      },
    },
  },
  server: {
    open: true,
    proxy: {
      '/faker': {
        target: 'http://localhost:4000',
        pathRewrite: { '^/faker': '' },
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: 'localhost',
      },
      '/wkylin': {
        // target: 'https://jsonplaceholder.typicode.com',
        // target: service[env.proxy] // --env.proxy=test
        target: 'https://my-json-server.typicode.com',
        // pathRewrite: { '^/wkylin': '/wkylin' },
        secure: false,
        changeOrigin: true,
      },
      '/v2': {
        target: 'https://www.mocky.io',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  // 去除console和debugger
  esbuild: {
    pure: ['console.log', 'debugger'],
  },
  build: {
    sourcemap: true, // 构建后是否生成 source map 文件
    write: true, // 设置为 false 来禁用将构建后的文件写入磁盘。
    // 自定义底层的 Rollup 打包配置。
    rollupOptions: {
      // external: [],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        // chunkFileNames: (chunkInfo) => {
        //   const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
        //   const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
        //   return `js/${fileName}/[name].[hash].js`
        // },
      },
    },
  },
  // https://cn.vitejs.dev/config/preview-options.html#preview-port
  // 指定开发服务器端口。注意，如果设置的端口已被使用，Vite 将自动尝试下一个可用端口，所以这可能不是最终监听的服务器端口。
  preview: {
    port: 4173,
  },
})

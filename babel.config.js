const plugins = [
  ['@babel/plugin-syntax-dynamic-import'],
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-transform-runtime'],
  ['@babel/plugin-transform-modules-commonjs'],
  [require('babel-plugin-await-add-trycatch')],
]

module.exports = {
  // * ! Webpack 默认处理 ES2015 模块并将其转换为代码，但它不会转换特定语法，例如 const。生成的代码可能会出现问题，尤其是在旧版浏览器中。
  // * 加载脚本: https://tsejx.github.io/webpack-guidebook/best-practice/practical-application/loading-javascript
  // 配置 babel 解析 react

  // presets 预设：就是一组 Babel 插件, 扩展 Babel 功能。
  //   @babel/preset-env: 一个智能预设，允许使用最新的 JavaScript。
  //   @babel/preset-react：一个用来编译 React jsx 语法的预设。
  //   @babel/preset-typescript：一个用来编译 TypeScript 语法的预设。
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/typescript',
  ],
  compact: true,
  // 这个不设置的话，webpack 魔法注释会被删除，魔法注释用于分包
  comments: true,
  // eslint-disable-next-line prettier/prettier
  plugins: process.env.NODE_ENV === 'production'
      ? [...plugins, 'transform-remove-console', 'transform-remove-debugger']
      : plugins,
}

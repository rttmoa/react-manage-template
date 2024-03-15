// ! 封装webpack自定义插件
// 参考：https://www.yuque.com/yuqueyonghua2m9wj/web_food/ler3mg32asyiodg8#rcJzo
//  1. 创建一个 JavaScript 文件，并导出一个函数。这个函数将作为你的插件的构造函数。
//  2. 在函数中定义一个 apply 方法，该方法接收一个 compiler 参数。这个 compiler 对象是 Webpack 的核心，它包含了 Webpack 的所有配置和工作流程。
//  3. 在 apply 方法中，可以通过 compiler.hooks 对象访问 Webpack 的生命周期钩子。通过这些钩子，你可以在 Webpack 运行的不同阶段执行自定义代码。
//  4. 实现你的插件逻辑，例如在特定的 Webpack 钩子上注册回调函数，向编译器添加自定义插件等。
//  5. 将你的插件打包成一个 npm 模块，并在项目中引入和使用它。
// 下面是一个简单的 Webpack 插件示例：

class MyPlugin {
  constructor(props) {
    // eslint-disable-next-line constructor-super
    super(props)
  }

  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    // 注册初始化阶段的钩子函数
    compiler.hooks.initialize.tap('MyPlugin', () => {
      console.log('MyPlugin initialized')
    })

    // 注册编译阶段的钩子函数
    compiler.hooks.compile.tap('MyPlugin', () => {
      console.log('MyPlugin compiling')
    })
  }
}

module.exports = MyPlugin
// 使用
// const MyPlugin = require('./my-plugin');
// module.exports = {
//   ...
//   plugins: [
//     new MyPlugin(),
//   ],
// };

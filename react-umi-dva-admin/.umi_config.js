// 此配置是 umi4 配置项： https://umijs.org/docs/max/layout-menu

export default {
  // 配置布局
  layout: {
    title: 'Ant Design',
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
  // 整合antd组件库
  antd: {
    // 配置项说明：https://umijs.org/docs/max/antd#%E6%9E%84%E5%BB%BA%E6%97%B6%E9%85%8D%E7%BD%AE
    // configProvider
    configProvider: {},
    // themes
    dark: true,
    compact: true,
    // babel-plugin-import
    import: true,
    // less or css, default less
    style: 'less',
    // shortcut of `configProvider.theme`
    // use to configure theme token, antd v5 only
    theme: {},
    // antd <App /> valid for version 5.1.0 or higher, default: undefined
    appConfig: {},
    // Transform DayJS to MomentJS
    momentPicker: true,
    // Add StyleProvider for legacy browsers
    styleProvider: {
      hashPriority: 'high',
      legacyTransformer: true,
    },
  },
};

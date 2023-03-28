# Getting Started with Create React App

## 安装及启动

**安装：`npm install` 运行前台:**` npm start` & **运行后台**：`npm start `

**前台端口：`3008` & 后台端口：`5000`**

## 项目技术栈

react + redux + react-router-dom + antd +cookie+publish

前端技术：React + React-Router + Redux + React-Redux + Redux-Saga + Webpack `<br>`
前端脚手架：[dva](https://github.com/dvajs/dva) `<br>`
UI组件库：[ant-design](https://github.com/ant-design/ant-design) `<br>`
后端技术：Express + Mongoose `<br>`

该项目采用前后端分离技术，前端使用React全家桶，项目整体框架使用dva，dva是一个将redux、redux-saga 和 react-router 等进行封装的前端框架，方便项目配置及代码管理；后端使用express + mongoose 进行后端业务处理及数据库操作。`<br>`

## 实现功能

1 `.` 用户登录功能, Cookie, Redux
2 `.` 商品分类管理；一级分类；二级分类
3 `.` 商品管理；商品的增删改查
4 `.` 创建新用户；用户的增删改查
5 `.` 角色管理；角色查看目录的范围
6 `.` 图形图表；echarts柱状图，折线图，饼图

## 技术点

* [X] 每个角色查看页面的权限（Slide）
* [X] 头部使用发布订阅模式 PubSub 开启或关闭侧边栏+系统语言使用中英文版本（Header）
* [X] 商品管理中  包含功能  1、添加商品 2、修改商品 3、查看详情 4、上下架/搜索
* [X] 商品管理中  包含技术：图片上传,删除,预览功能、富文本编辑器的使用、发布订阅存储img和content的使用
* [X] Redux中actions中；cookie和redux的使用
* [X] 多组件封装
* [X] 商品管理中 Cascader  Antd组件库

Package.json中； braft-editor、echarts-for-react、i18next、js-cookie、prop-types、pubsub-js、redux、react-router-dom

# Day01\_核心问题

## 01_webpack_为何学

### 问题

1. 我们为什么要学习webpack？

### 答案

1. 我们为什么要学习webpack？
    1. 减少文件数量
    2. 缩减代码体积
    3. 提高浏览器打开的速度

## 02_webpack_基本概述

### 问题

1. 什么是webpack？作用是？目的是？

### 答案

1. 什么是webpack？作用是？目的是？
    1. 它是一个Node的第三方模块
    2. 作用是识别代码，翻译，压缩，整合打包
    3. 提高打开网站的速度

## 03_webpack\_使用前_准备工作

### 问题

1. 使用webpack需要做哪些准备工作？

### 答案

1. 使用webpack需要做哪些准备工作？
    1. 初始化包环境，得到package.json文件
    2. 下载webpack等模块
    3. 在package.json自定义命令，为打包做准备

## 04_webpack\_基本使用_打包2个js文件

### 问题

1. webpack如何使用呢？

### 答案

1. webpack如何使用呢？
    1. 默认src/index.js - 打包入口文件
    2. 需要引入到入口的文件才会参与打包
    3. 执行package.json里的build命令，间接执行webpack打包命令
    4. 默认输出dist/main.js的打包结果

## ==练习时间：5m==

## 05_webpack\_更新打包_重新打包

### 问题

1. 代码增加后，如何打包呢？

### 答案

1. 代码增加后，如何打包呢？
    1. 确保在src/index.js引入和使用
    2. 重新执行yarn build打包命令

## 06_webpack_修改默认入口和出口

### 问题

1. 如何修改webpack入口和出口？

### 答案

1. 如何修改webpack入口和出口？
    1. 新建webpack.config.js（webpack默认配置文件名）
    2. 通过entry设置入口文件路径
    3. 通过output对象设置出口路径和文件名

## ==练习时间：3m==

## 07_webpack_打包流程

### 问题

1. 一句话总结下yarn build后干了什么？
2. 所有要被打包的资源应该怎样处理？

### 答案

1. 一句话总结下yarn build后干了什么？
    1. 执行webpack命令，找到配置文件，入口和依赖关系，打包代码输出到指定位置
2. 所有想要被打包的文件应该怎样处理？
    1. 所有要被打包的资源都要跟入口产生直接或间接的引用关系

## 08_webpack案例_隔行变色

### 问题

1. 用yarn下的包，如何作用在前端项目中？

### 答案

1. 用yarn下的包，如何作用在前端项目中？
    1. 借助webpack，把模块和代码打包
    2. 把js文件引入到html执行查看效果

## 09_webpack插件_自动生成html文件

### 问题

1. 如何让webpack打包时自动生成html文件呢？

### 答案

1. 如何让webpack打包时自动生成html文件呢？
    1. 依赖html-webpack-plugin插件，yarn下载此插件
    2. 在webpack.config.js配置文件写入即可

## ==练习时间：5m==

## 10_webpack_打包css文件问题

### 问题

1. 为什么webpack打包css文件会报错呢？

### 答案

1. 为什么webpack打包css文件会报错呢？
    1. 因为webpack默认只能处理js文件

## 11_webpack加载器_打包css文件

### 问题

1. webpack如何支持css打包？打包后样式在哪里？如何生效？

### 答案

1. webpack如何支持css打包？打包后样式在哪里？如何生效？
    1. 依赖css-loader和style-loader
    2. css代码被打包进js文件中
    3. style-loader会把css代码插入到head下style标签内

## 12_webpack加载器_打包less文件

### 问题

1. webpack如何支持less打包？需要注意什么？

### 答案

1. webpack如何支持less打包？需要注意什么？
    1. 依赖less-loader和less模块包
    2. 转换css后还需要css-loader和style-loader的处理

## ==练习时间：5m==

## 13_webpack处理图片_配置asset

### 问题

1. webpack如何支持图片打包？对图片有哪两种处理方案？

### 答案

1. webpack如何支持图片打包？对图片有哪两种处理方案？
    1. webpack5，在rules里，针对图片文件设置type: asset
    2. 小于8KB转base64字符串进js里，大于8KB输出文件

## 14_webpack处理图片_优点和缺点

### 问题

1. 图片转base64打包进js中的好处和坏处？

### 答案

1. 图片转base64打包进js中的好处和坏处？
    1. 好处是减少浏览器发送的请求次数，读取图片速度快
    2. 坏处是图片过大，转base64占空间会多30%左右

## 15_webpack处理字体图标文件

### 问题

1. webpack如何处理图标字体文件？

### 答案

1. webpack如何处理图标字体文件？
    1. 在webpack.config.js的rules里针对字体图标文件类型设置asset/resource，直接输出到dist下

## 16_webpack加载器_babel降级js语法

### 问题

1. webpack如何帮助我们降低js版本语法？

### 答案

1. webpack如何帮助我们降低js版本语法？
    1. 借助babel-loader和babel编译器，给webpack配置上

## ==练习时间：5m==

## 17_webpack_开发服务器概述

### 问题

1. 为什么要使用webpack开发服务器呢？

### 答案

1. 为什么要使用webpack开发服务器呢？
    1. 打包在内存中，速度快
    2. 自动更新打包变化的代码，实时返回给浏览器显示

## 18_webpack\_开发服务器_基础使用

### 问题

1. 如何使用webpack开发服务器实时打包我们的代码呢？

### 答案

1. 如何使用webpack开发服务器实时打包我们的代码呢？
    1. 确保下载了webpack-dev-server这个包
    2. 在package.json配置自定义命令，然后启动即可
    3. webpack-dev-server会给我们一个地址+端口浏览器访问即可看到在内存中打包的index.html页面

## 19_webpack\_开发服务器_相关配置

### 问题

1. 如何修改webpack开发服务器的配置呢？

### 答案

1. 如何修改webpack开发服务器的配置呢？
    1. 去文档查找配置项的名字
    2. 在webpack.config.js的devServer选项里添加

## ==练习时间：5m==
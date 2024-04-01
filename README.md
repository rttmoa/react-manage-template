# React Admin

![check-status](https://img.shields.io/badge/check-status "check-status")
![version-status](https://img.shields.io/github/package-json/v/rttmoa/ReactAdmin "version-status")
![license](https://img.shields.io/aur/license/license "license")
![contributors](https://img.shields.io/github/contributors/rttmoa/ReactAdmin "contributors")
[![DeepScan grade](https://deepscan.io/api/teams/16370/projects/24083/branches/739580/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16370&pid=24083&bid=739580)

## 项目特性

1. 升级 Ant 5.x.x， 实现亮白与暗黑主题切换，并自定义组件主题，且组合紧凑算法实现相关主题
2. 基于 React 最新版本，拥抱 Hooks
3. 基于 React Router V6, 实现嵌套路由更方便
4. 基于 Webpack 最新版本，实现多环境打包部署，代码分割优化，结合官方分析工具，实时优化代码
5. 同时 支持 vite 4.x.x, 极速构建
6. 基于 Faker 实现 Mock Server,不依赖后端实现模拟数据更加方便
7. 封装 Fetch, 实现 useFetch, 请求更加方便，取消请求，实现请求及响应拦截，方便数据处理及统一报错提示
8. 支持 TypeScript 5.x.x, 一切变得可控，扼杀错误于摇篮之中
9. 支持多页签，提升效率，支持国际化
10. 代码风格统一，项目统一配置 ESLint/Prettier/Husky/EditorConfig
11. 配置 Commit message， 使用标准 commit 生成 changelog 标准化
12. 配置 Sentry，方便日志追踪，及时发现问题
13. 实现 ErrorBoundary,方便定位问题，避免不可预知的问题导致系统崩溃
14. 代码分割，组件懒加载，Loading 垂直水平居中
15. 集成 Bit，跨项目复用组件，支持在多个仓库间隔离和复用代码，简化协作过程，可以共享、维护和同步来自不同项目的隔离组件
16. 集成 Bookstory, 方便生成组件文档

## Antd 4.x.x

1. 基于 Antd 实现亮白及暗黑两套主题， 请参见 feature-antd4 分支

## 技术栈

1. React: v18.x.x [React](https://reactjs.org/)
2. React Router: v6.x.x [React Router](https://reactrouter.com/)
3. Webpack:v5.x.x [Webpack](https://webpack.js.org/)
4. Babel: v7.x.x [Babel](https://babeljs.io/), [Versions](https://babel.docschina.org/versions/)
5. Antd: v5.x.x [Ant Design](https://ant.design/index-cn)
6. TypeScript: v5.x.x[TypeScript](https://www.typescriptlang.org/)
7. Vite: v4.x.x [Vite](https://vitejs.dev/)

## start

```bash
 
  1. 可以选择以下两种方式的任一方式启动项目, 其他 cli 参考 package.json 中的 scripts
    - $ npm start
    - $ npm run dev:faker
    - $ npm run vite:dev:faker
  2. Bit - Build composable software
    - $ npm i -g @teambit/bvm
    - $ bvm install
    - $ bvm upgrade
    - $ bit start
  3. Storybook -- A tool for UI development
    - npx storybook init
    - npm run storybook
```

## 脚手架；白泽 baize(开源后台管理)

- 可以使用为此项目准备的脚手架开发--白泽 baize

  ```bash
     > npm install baize --location=global
     > baize
  ```

## alias；别名

```bash
    "alias-skip.mappings": {
        "@src": "/src",
        "@stateless": "/src/components/stateless",
        "@stateful": "/src/components/stateful",
        "@hooks": "/src/components/hooks",
        "@container": "/src/components/container",
        "@assets": "/src/components/assets",
        '@pages': path.resolve('./src/pages'),
        '@routers': path.resolve('./src/routers'),
        '@utils': path.resolve('./src/utils'),
    }
```

## WebStorm 别名

1. Settings >> Languages & Frameworks >> Javascript >> Webpack: 指定 Configuration file: webpack\webpack.common.js

## 使用标准 commit 生成 changelog 标准化

- [conventional-changelog](https://github.com/conventional-changelog)
- [standard-version](https://github.com/conventional-changelog/standard-version)
- npm install
- package.json
- git commit
- conventional-changelog-cli
- standard-version

  - changes
  - git add . / git cz
  - npm run release

  ```bash
  npm install --save-dev commitizen
  npm install --save-dev cz-conventional-changelog
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
  git add .
  git cz or cz
  npm install -g conventional-changelog-cli
  conventional-changelog -p angular -i CHANGELOG.md -s
  npm install -g standard-version
  "release": "standard-version --tag-prefix \"publish/\""
  ```

## [🚀](https://blog.csdn.net/Litt_White/article/details/124786509)约定式提交

1. [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

## Commit message

1. The commit message should be structured as follows:

   ```bash
     <type>[optional scope]: <description>
     <BLANK LINE>
     [optional body]
     <BLANK LINE>
     [optional footer(s)]
   ```
2. "type-enum": ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]
3. type-enum 说明文档：

   - build: 依赖调整
     影响构建系统或外部依赖的更改 (示例作用域：gulp, broccoli, npm）
   - chore: 杂务处理
     其他不会修改源文件或者测试文件的更改
   - ci: 脚本变更
     对 CI 配置文件和脚本的更改（示例作用域： Travis, Circle, BrowserStack, SauceLabs)
   - docs: 文档变更
     添加或者更新文档
   - feat: 添加功能
     引入新的特性
   - fix 错误修复
     修复 bug
   - perf: 性能优化
     更改代码以提高性能
   - refactor: 代码重构
     即不是修复 Bug，也不是添加特性的代码更改
   - revert: 恢复版本
     恢复到上一个版本
   - style: 格式调整
     不会影响代码含义的更改（空格，格式缺少分号等）
   - test: 更新测试
     添加或者更新测试
4. [Devmoji 提交库](https://www.npmjs.com/package/devmoji)
5. [提交消息的表情符号Emojs](https://gitmoji.dev/)
6. [git commit 工具链](https://juejin.cn/post/7067166468797890591)
7. [https://theodorusclarence.com/library/conventional-commit-readme](https://theodorusclarence.com/library/conventional-commit-readme)

## React 代码拆分库

1. [Loadable Components](https://loadable-components.com/)

## Mock Server

```bash
// mock index.js
npm run dev:faker
```

## [🚀](https://blog.csdn.net/Litt_White/article/details/124786509)部署

1. Deployment: [Deployment] ([https://create-react-app.dev/docs/deployment](https://create-react-app.dev/docs/deployment))
2. Deploy gh-pages:

   ```bash
   "predeploy": "npm run build:production",
    "deploy": "gh-pages -d dist",
   ```

## [🚀](https://blog.csdn.net/Litt_White/article/details/124786509)架构

![whiteboard_exported_image](https://github.com/wkylin/pro-react-admin/assets/1208330/c28852c2-7efe-407f-80f8-41d741ef3108)

## [🚀](https://blog.csdn.net/Litt_White/article/details/124786509)待解决

1. 配备比较完善的脚手架：
   - [https://blog.kiradev.co/build-a-cli-using-nodejs](https://blog.kiradev.co/build-a-cli-using-nodejs)
2. 完善文档：
   - [https://docusaurus.io/](https://docusaurus.io/)
   - [https://d.umijs.org/zh-CN](https://d.umijs.org/zh-CN)
   - [Bit](https://bit.dev/)
3. CacheRoute: [react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)

## Docusaurus

1. Github:
2. Demo:

## Snyk

```js
  - npm install -g snyk
  - snyk auth
  - snyk monitor
```

## Bit

1. [Bit.dev](https://bit.dev/)
2. [Bit 实践](https://juejin.cn/post/7157576390177456159)

## 已支持特性

1. TypeScript: [TypeScript](https://www.typescriptlang.org/)
   - [https://react-typescript-cheatsheet.netlify.app/](https://react-typescript-cheatsheet.netlify.app/)
   - [https://usehooks-ts.com/](https://usehooks-ts.com/)
   - [webpack-react-boilerplate](https://github.com/gor918/webpack-react-boilerplate)
   - [https://usehooks.com/](https://usehooks.com/)
   - [https://ahooks.js.org/](https://ahooks.js.org/)
2. Mock Server
   - [Faker](https://fakerjs.dev/)
   - [msw](https://github.com/mswjs/msw)
3. 单页面多页签参考
   - [react-antd-multi-tabs-admin](https://github.com/hsl947/react-antd-multi-tabs-admin.git)
4. Axios
   - [axios 拦截器之重复请求取消](https://juejin.cn/post/7004721390767046686)
5. React SVGR
   - [https://react-svgr.com/docs/webpack/](https://react-svgr.com/docs/webpack/)

## [🚀]()代码规范：ESLint Prettier Husky EditorConfig

1. ESLint: [ESLint](https://eslint.org/)

   ESLint is a linter for the JavaScript language, written in Node.js. That helps you find and fix problems in your JavaScript code.

   [https://json.schemastore.org/eslintrc](https://json.schemastore.org/eslintrc)
2. Prettier: [Prettier](https://github.com/prettier/prettier)

   Prettier is an opinionated code formatter that formats the code with the help of rules we set.
3. Husky: [Husky](https://github.com/typicode/husky)

   Husky is an NPM package that lets you run a set of commands or script before any git action. For eg pre-push, pre-commit, pre-rebase.
4. Commit Lint: [Commit Lint ](https://commitlint.js.org)

   CommitLint helps your team adhering to a commit convention. By supporting npm-installed configurations it makes sharing of commit conventions easy.
5. Editor Config: [EditorConfig](https://EditorConfig.org)
   EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
6. Semantic Versioning: [Semantic Versioning](https://semver.org/)
7. Active hooks:
   [https://typicode.github.io/husky/#/?id=install](https://typicode.github.io/husky/#/?id=install)
8. Prettierrc
   [http://json.schemastore.org/prettierrc](http://json.schemastore.org/prettierrc)
9. Conflict eslint prettier Conditional (ternary) operator

   ```bash
    // lint-staged

    "lint-staged": {
      "**/*": [
        "npm run prettier:fix"
      ],
      "src/**/*.{js, jsx, ts, tsx}": [
        "npm run eslint:fix",
        "npm run prettier:fix"
      ],
      "src/**/*.less": [
        "npm run stylelint:fix",
        "npm run prettier:fix"
      ],
      "*.md": [
        "npm run markdownlint:fix",
        "npm run prettier:fix"
      ]
    },
    // .eslintrc.json
    "extends": ["plugin:react/recommended", "standard", "prettier"],
    // package.json
    "prettier:fix": "prettier --write \"src/**/*\" --end-of-line auto --ignore-unknown",
   ```

## 自动化持续代码审查工具

1. [DeepSource/](https://deepsource.io/)
2. [DeepScan](https://deepscan.io/)
3. [SonarQube](https://www.sonarsource.com/)

## Mac 本地部署 SonarQube

1. [SonarQube for Mac](https://juejin.cn/post/7210005376652886077)
2. [Gitlab for Mac](https://juejin.cn/post/7210746685802397755)
3. [Gitlab CI/CD for Mac](https://juejin.cn/post/7214686619097874491)

## [🚀]()Sentry 接入

1. [Sentry](https://sentry.io/)
2. 遇到的问题：
   - ERROR in Sentry CLI Plugin: spawn /Users/sheldon/Desktop/promotion-manage-web/node_modules/@sentry/cli/sentry-cli ENOENT
   - 解决方案参考：[https://juejin.cn/post/6961012856636571655](https://juejin.cn/post/6961012856636571655)
   - "sentry:check": "node check-sentry.js
3. Self-Hosted Sentry nightly -[https://github.com/getsentry/self-hosted](https://github.com/getsentry/self-hosted)

## VSCode 扩展

1. ErrorLens: [ErrorLens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
2. SonarLint: [https://www.sonarlint.org/](https://www.sonarlint.org/)

## CSS Modules

CSS模块是一个CSS文件，其中的所有类名和动画名称默认都是本地作用域。

1. PostCSS: [PostCSS](https://postcss.org/)
2. StyleLint: [StyleLint](https://stylelint.io/)
   npx stylelint --help

## [🚀]()CSS Libary

1. Windi CSS: [Windi CSS](https://windicss.org/)
2. TailWind CSS: [TailWind CSS](https://tailwindcss.com/)

## [🚀]()CI/CD 自动化构建

1. GitHub Actions

## Test

1. [Jest](https://jestjs.io/)
2. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
3. [React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library)
4. [Cypress](https://www.cypress.io/)

```bash
    1. npm install jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer --save-dev
    2. npm install  --save-dev @testing-library/react
    3. npm install cypress --save-dev
    4. npm install --save-dev @testing-library/react-hook
```

## Plugins

1. [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
2. [react-refresh](https://www.npmjs.com/package/react-refresh)

## [🚀]()HTTP

1. HTTP: [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)

## Code Contributors

## [🚀]()许可证

1. [MIT](https://choosealicense.com/licenses/mit/)
2. [Choose A License](https://choosealicense.com/)

## Server: Dev, Test, UAT(Live), Staging, Demo, Production

1. [Server Info](https://www.gratasoftware.com/what-is-each-server-for-development-test-uat-or-staging-demo-and-production/)

Promotion Web
Licensed under the [Apache License](https://choosealicense.com/licenses/apache-2.0/).

## NPM version

npm version [| major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=[alpha, beta, rc]] | from-git]

## Git Tag

1. git tag -a v1.2.0 -m "version: 1.2.0"
2. git push origin v1.2.0
3. git push origin --tags

## [🚀]()Nginx

1. [Mac Nginx](https://newbedev.com/how-to-restart-nginx-on-mac-os-x)

   ```bash
    brew install nginx
    brew reinstall nginx

    /usr/local/var/www
    /usr/local/etc/nginx/nginx.conf
    /usr/local/etc/nginx/servers/

    brew services list
    brew services start nginx
    brew services stop nginx
    brew services restart nginx
   ```
2. Nginx.conf

   ```bash
   server {
    listen       8081;
    #server_name  localhost;
    server_name  www.promotion-web.com;

    location / {
        root   /usr/local/var/www/promotion-web;
        index  index.html index.htm;
        try_files  $uri $uri/ /index.html @rewrites;
        expires -1;
        add_header Cache-Control no-cache;
        # proxy_pass http://localhost:3000;
    }
    # 接口转发，如果需要的话
    #location ~ ^/api {
    #  proxy_pass http://www.wklin.com;
    #}
    location @rewrites {
      rewrite ^(.+)$ /index.html break;
    }
    # 或者全部重定向
    # return 301 https://$server_name$request_uri;
   }

    # SwitchHosts!
    192.168.1.101 www.promotion-web.com
   ```
3. Nginx for Windows

   ```bash
      1. start nginx
      2. nginx -s stop
      3. nginx -s quit
      4. nginx -s reload
      5. nginx -s reopen
   ```

## [🚀]()Tree Node Cli（生成目录结构）

1. npm install -g tree-node-cli
2. Mac: tree -L 2 -I "node_modules" -r -F
3. Win: treee -L 2 -I "node_modules" -r -F
4. tree node

   ```bash
    react-admin/
   ├── workspace.jsonc
   ├── webpack/
   │   ├── webpack.prod.js
   │   ├── webpack.dev.js
   │   ├── webpack.common.js
   │   ├── process.js
   │   ├── paths.js
   │   └── dev.proxy.js
   ├── vite.config.js
   ├── typings/
   │   ├── style.d.ts
   │   ├── declaration.d.ts
   │   └── asset.d.ts
   ├── tsconfig.json
   ├── src/
   │   ├── utils/
   │   ├── theme.tsx
   │   ├── theme/
   │   ├── styles/
   │   ├── store/
   │   ├── service/
   │   ├── routers/
   │   ├── reducers/
   │   ├── pages/
   │   ├── index.tsx
   │   ├── components/
   │   ├── assets/
   │   ├── actions/
   │   └── App.tsx
   ├── public/
   │   ├── robots.txt
   │   ├── manifest.json
   │   ├── loading.svg
   │   ├── index.html
   │   └── favicon.ico
   ├── packagehash.txt
   ├── package.json
   ├── package-lock.json
   ├── index.html
   ├── faker/
   │   ├── utils/
   │   ├── shops/
   │   ├── index.js
   │   └── app/
   ├── docker-compose.yml
   ├── dist/
   │   ├── static/
   │   ├── react.bb194261542b956cd3ea.js.map
   │   ├── react.bb194261542b956cd3ea.js.gz
   │   ├── react.bb194261542b956cd3ea.js.LICENSE.txt
   │   ├── react.bb194261542b956cd3ea.js
   │   ├── index.html
   │   └── favicon.ico
   ├── compilation-stats.json
   ├── check-sentry.js
   ├── babel.config.js
   ├── api/
   │   ├── server.js
   │   ├── package.json
   │   ├── package-lock.json
   ├── SECURITY.md
   ├── README.md
   ├── LICENSE
   ├── Dockerfile
   ├── CODE_OF_CONDUCT.md
   └── CHANGELOG.md
   ```

## Webpack Analyse

1. [Webpack 官方分析工具](https://webpack.github.io/analyse/)

   ```bash
      npm run analyze:build
   ```

## CRACO：创建React应用程序配置

1. [https://github.com/gsoft-inc/craco](https://github.com/gsoft-inc/craco)

## 与 ESLint 风格不一致

1. "lint:json": "jsonlint --quiet src/\*_/_.json",
2. "standard": "standard src/\*_/_",
3. "standard:fix": "standard --fix src/\*_/_",
4. rm -rf package-lock.json

## Update npm

```bash
  npm install css-loader@5.2.7 --save-dev
  "webpack-dev-server": "^4.1.1",
  Uncaught TypeError: SocketClient is not a constructor
```

## GitHub Proxy

1. 首先确认自己 git 拉取代码的方式

   ```bash
     git remote -v
   ```
2. 设置代理

   ```bash
     git config --global https.proxy 127.0.0.1:10808
     git config --global http.proxy 127.0.0.1:10808
     git config --global http.proxy 'socks5://127.0.0.1:10808'
     git config --global https.proxy 'socks5://127.0.0.1:10808'
   ```
3. 查看代理是否成功

   ```bash
     git config --get --global http.proxy
   ```
4. 查看 git 配置

   ```bash
     git config --global --list
   ```
5. 取消代理

   ```bash
     git config --global --unset http.proxy
     git config --global --unset https.proxy
   ```

## pm-keeper

1. [https://www.npmjs.com/package/pm-keeper](https://www.npmjs.com/package/pm-keeper)

## npm i && npm ci

1. [npm ci vs. npm install](https://betterprogramming.pub/npm-ci-vs-npm-install-which-should-you-use-in-your-node-js-projects-51e07cb71e26)

## Husky 不起作用解决方案

参考官网：[https://typicode.github.io/husky/#/](https://typicode.github.io/husky/#/)
按以下步骤进行设置：

1. 删除 .git 目录下的 hooks 及 .husky
2. 查看 git config 配置是否存在 core.hookspath=.husky

   ```base
     git config --list
   ```
3. 删除配置及卸载 Huksy:

   ```base
     npm uninstall husky && git config --unset core.hookspath
   ```
4. 再次安装 Husky:

   ```base
     npm install husky --save-dev
     // npm set-script prepare "husky install"
     npx husky-init
   ```
5. 新增 Hooks：

   ```base
     npx husky add .husky/pre-commit "npx lint-staged"
     npx husky add .husky/pre-commit "npx pretty-quick --staged"
     npx husky add .husky/commit-msg 'npx --no-install commitlint --edit'
   ```

## Show your support

<!-- Give a ⭐️ if this project helped you! -->

If you like the project, give it a star ⭐️, it will be a great encouragement to me.

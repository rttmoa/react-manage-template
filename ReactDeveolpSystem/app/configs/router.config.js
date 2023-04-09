import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'
import { isLogin } from '@configs/common'
import { set } from '@config'

import * as base from '@pages/base'  // 侧边栏：基础
import * as sysSet from '@pages/set' // 侧边栏：设置中心
import * as menu from '@pages/menu'  // 侧边栏：图表和编辑器


// console.log(set) // set$




export default () => (
  <Router history={hashHistory} >
    <Route path="/" component={base.app} onEnter={isLogin}> 
      <IndexRoute component={base.example} />
      <Route path="/desk$/index" component={base.example} />
      {/* <Route path="/socketReceive" component={base.socketReceive} /> */}

      {/** *图表和编辑器 */}
      <Route path="/echarts" component={menu.echarts} />
      <Route path="/editor" component={menu.editor} />

      {/** *系统中心 */}
      <Route path={`/${set}/userManage`} component={sysSet.userManage} />
      <Route path={`/${set}/roleManage`} component={sysSet.roleManage} />
      <Route path={`/${set}/moduleManage`} component={sysSet.moduleManage} />
      
    </Route> 
    <Route path="/login" component={base.login} />
    <Route path="*" component={base.notfound} />
  </Router>
)
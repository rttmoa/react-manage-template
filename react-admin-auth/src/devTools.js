import React from 'react'
import { createDevTools } from 'redux-devtools'   //--->  redux-devtools 是一个非常棒的工具，它可以让你实时的监控 Redux 的状态树的 Store
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'


//redux-devtools 简单使用： https://baijiahao.baidu.com/s?id=1755244006851501763&wfr=spider&for=pc


export default createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-H" changePositionKey="ctrl-Q">
        <LogMonitor />
    </DockMonitor>
)

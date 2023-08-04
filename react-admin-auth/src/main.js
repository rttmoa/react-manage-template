import React from 'react'
import { render } from 'react-dom'
// import { createStore, compose, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import Router from './router'     //--->  router文件夹下indexjs
import configureStore from './store'   //--->  store文件夹下indexjs
import DevTools from './devTools'  //--->  devTools 用于 实时的监控 Redux 的状态树的 Store
import 'src/actions'              //--->  actions文件夹下的indexjs  export default Object.assign({}, app, common, user)
import 'utils/iconfont'    //--->  iconfont
// import 'antd/dist/antd.less'
import './styles/index.css'
import './styles/index.less'
import 'components/Markdown/markdown.css'   //--->  markdown.css

const store = configureStore()
{process.env.NODE_ENV === 'production' ? '' : <DevTools/>}




render(
    <Provider store={store}>
        <div>
            <Router /> 
        </div>
    </Provider>
, document.getElementById('app'))

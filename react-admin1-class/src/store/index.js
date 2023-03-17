import { createStore, compose, applyMiddleware  } from 'redux'
import DevTools from '../devTools'
import reducer from '../reducers'
import thunk from 'redux-thunk'





const fn = store => next => action => {
    next(action)
}

const configureStore = preloadedState => createStore(
    reducer,
    preloadedState,
    compose(
        applyMiddleware(thunk, fn),
        DevTools.instrument()
    ) 
)
export default configureStore;


//redux-devtools 简单使用： https://baijiahao.baidu.com/s?id=1755244006851501763&wfr=spider&for=pc
// DevTools.instrument()
    // 用 DevTools.instrument() 通过 redux 的 compose 来扩展 store，
    // 用 createDevTools() 创建的 DevTools 组件有个特殊的静态方法 instrument()，
    // 它返回一个 store 的增强器，在开发中你需要在 compose 中使用。
        // 注意：DevTools.instrument() 要放在 applyMiddleware 后，
        // 因为你的 applyMiddleware 可以存在异步行为，
        // 为了确保所有的 actions 显示在 store 中，所以要放在后面
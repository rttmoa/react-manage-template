/**
 * 包含n个action create函数的模块
 * 同步action : 对象{type:'xxx'.data:值}
 * 异步action : dispatch=>{}
 */
import {login} from '../api/login'
import {RECEIVE_USER, LOGOUT_USER} from './action-types'
import {setUser, removeUser} from '../utils/storaUtil'

//登录
export const receiveUser = (user) => ({type: RECEIVE_USER, data: user})

//登出
export const logoutUser = (data) => ({type: LOGOUT_USER, data})


// 登录的异步action
export const doLogin = (user) => {
    return dispatch => {
        login(user).then(res => {
            // console.log(res) // {status:0, data: { create_time, password, role:{menus:[]}, username, __v, _id }}
            // return
            if (res.status === 0) { // 如果状态码等于零  设置Cookie 存储到Redux
                setUser(res.data)
                dispatch(receiveUser(res.data))
            }
        })
    }
}

// 登出的异步action
export const doLogout = (data) => { // 如果登出  清除Cookie  删除Redux
    return dispatch => {
        removeUser()
        dispatch(logoutUser(data))
    }
}

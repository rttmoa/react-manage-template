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


//登录的异步action
export const doLogin = (user) => {
    return dispatch => {
        login(user).then(res => {
            if (res.status === 0) {
                setUser(res.data)
                dispatch(receiveUser(res.data))
            }
        })
    }
}
//登出的异步action
export const doLogout = (data) => {
    return dispatch => {
        removeUser()
        dispatch(logoutUser(data))
    }
}

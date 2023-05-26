import {getUser} from '../utils/storaUtil'
//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'
import {RECEIVE_USER,LOGOUT_USER} from './action-types'

/**
 * 用来根据老的state和指定的cation生成并返回新的state的函数
 */

const initUser = getUser() === undefined ? "" : getUser();
// console.log(initUser)

//用来管理当前登录的用户
function user(preState = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            // console.log(action) // {type: 'receive_user', data:{ create_time, password, role:{menus:[]}, username, __v, _id }}
            return action.data
        case LOGOUT_USER:
            return action.data
        default:
            return preState
    }
}

//汇总所有的reducer变为一个总的reducer
export default combineReducers({
    user
})
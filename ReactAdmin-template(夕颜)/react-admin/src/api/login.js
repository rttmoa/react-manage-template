import request from '../utils/request'

//登录
export function login(data) {
    // console.log(data) // {username: 'admin', password: 'admin'}
    // return
    return request({
        url: '/login',
        method: 'post',
        data
    })
}
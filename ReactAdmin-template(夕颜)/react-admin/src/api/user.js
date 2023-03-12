import request from '../utils/request'

/**--- 用户管理模块 ---**/

//列表
export function list() {
    return request({
        url: '/manage/user/list',
        method: 'get'
    })
}

//添加
export function add(data) {
    return request({
        url: '/manage/user/add',
        method: 'post',
        data
    })
}

//修改
export function update(data) {
    return request({
        url: '/manage/user/update',
        method: 'post',
        data
    })
}

//删除
export function del(data) {
    return request({
        url: '/manage/user/delete',
        method: 'post',
        data
    })
}
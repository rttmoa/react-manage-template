import request from '../utils/request'

// 列表
export function list() {
    return request({
        url: '/manage/role/list',
        method: 'get'
    })
}

// 添加
export function add(data) {
    // console.log(data)  //---> {roleName: '测试data'}
    return request({
        url: '/manage/role/add',
        method: 'post',
        data
    })
}

// 修改
export function update(data) {
    return request({
        url: '/manage/role/update',
        method: 'post',
        data
    })
}
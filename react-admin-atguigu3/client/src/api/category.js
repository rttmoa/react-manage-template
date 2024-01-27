import request from '../utils/request'

//列表
export function list(parentId) {
    return request({
        url: `/manage/category/list?parentId=${parentId}`,
        method: 'get',
    })
}

//添加
export function add(data) {
    return request({
        url: '/manage/category/add',
        method: 'post',
        data
    })
}

//修改
export function update(data) {
    return request({
        url: '/manage/category/update',
        method: 'post',
        data
    })
}

//根据id查询分类
export function info(id) {
    return request({
        url: '/manage/category/info?categoryId=' + id,
        method: 'get',
    })
}
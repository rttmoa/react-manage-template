import request from '../utils/request'

//列表
export function list(pageNum, pageSize) {
    return request({
        url: `/manage/product/list?pageNum=${pageNum}&pageSize=${pageSize}`,
        method: 'get',
    })
}

//搜索
export function search(pageNum, pageSize, productType, productValue) {
    return request({
        url: `/manage/product/search?pageNum=${pageNum}&pageSize=${pageSize}&${productType}=${productValue}`,
        method: 'get',
    })
}

//上下架
export function updateStatus(data) {
    return request({
        url: "/manage/product/updateStatus",
        method: 'post',
        data
    })
}

//添加
export function add(data) {
    return request({
        url: "/manage/product/add",
        method: 'post',
        data
    })
}
//修改
export function update(data) {
    return request({
        url: "/manage/product/update",
        method: 'post',
        data
    })
}


import request from '../utils/request'

//上传文件
export function upload(data) {
    return request({
        url: '/manage/img/upload',
        method: 'post',
        data
    })
}

//删除文件
export function delUpload(data) {
    return request({
        url: '/manage/img/delete',
        method: 'post',
        data
    })
}
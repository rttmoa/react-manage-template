import axios from 'axios'
import qs from 'qs'
// import { Modal } from 'antd'


axios.defaults.withCredentials = true;

// 发送时
axios.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

// 响应时
axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

 
export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url: url,
            params,
            timeout: 30000
        })
    },
    post(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(data),
            timeout: 30000
        })
    }
}



 
// 检查状态码
function checkStatus(res) { 
    // 结束
    if (res.status === 200 || res.status === 304) {
        return res.data
    }
    return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    } 
} 
// 检查CODE值
function checkCode(res) {
    if (res.code === 0) throw new Error(res.msg)
    return res
} 
function handleGet(url, params) {
    if (!url) return
    return axios({
        method: 'get',
        url: url,
        params,
        timeout: 30000
    }).then(checkStatus).then(checkCode)
}

import request from '../utils/request';
import qs from 'qs';

const ORDER_API = '/api/orders';

export async function query(params) {
    // console.log(params);
    // console.log(qs.stringify(params));
    // console.log(await request(`${ORDER_API}?${qs.stringify(params)}`))
    return request(`${ORDER_API}?${qs.stringify(params)}`);
}

export async function create(params) { // params: {sequence: 21, orderNumber: 'MDC202305110021', customerId: '6451ee572dfb792d50d77d80', products: Array(1), totalAmount: -40, …}
    return request(ORDER_API, {
        method: 'post',
        body: JSON.stringify(params)
    });
// 格式化为JSON格式： {"sequence":21,"orderNumber":"MDC202305110021","customerId":"6451ee572dfb792d50d77d80","products":[{"key":"0","productId":"645a5ee0e7cb2043bcdd50a2","productName":"热水器","quantity":"-2","productUnit":"家电","price":"20","amount":-40,"remarks":""}],"totalAmount":-40,"paymentAmount":0,"mem":""}
}

export async function modify(params) {
    return request(`${ORDER_API}/${params['id']}`, {
        method: 'put',
        body: JSON.stringify(params)
    });
}

export async function del(params) { // params: {id: '645c586f0d8a823b4cc204bf'}
    return request(`${ORDER_API}/${params['id']}`, {
        method: 'delete'
    });
}

export async function getOrderNumber(data) { // data: {}
    return request(`${ORDER_API}/getOrderNumber`);
}

export async function getCustomers() {
	return request(`${ORDER_API}/getCustomers`);
}

export async function queryOrderById(orderId) { // 编辑/详情中获取OrderId： 645c5c6d0d8a823b4cc204c1
    return request(`${ORDER_API}/${orderId}`);
}

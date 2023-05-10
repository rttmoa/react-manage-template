import request from '../utils/request';
import qs from 'qs';

const RESOURCE_API = '/api/resource';





// 物资查询
export async function query(params) {
    return request(`${RESOURCE_API}?${qs.stringify(params)}`);
}

// 物资结算按钮
export async function onSettlement() {
	return request(RESOURCE_API,{
		method: 'post',
		body: JSON.stringify({})
	});
}

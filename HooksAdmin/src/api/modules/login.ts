/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import http from "@/api";



/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	let res = http.post<Login.ResLogin>(PORT1 + `/login`, params)
	// console.log('登陆', res.then(res => console.log(res)));
	// {code: 200, data: {access_token: 'bqddxxwqmfncffacvbpkuxvwvqrhln'}, msg: '成功'}
	return res;
	// return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 获取按钮权限
export const getAuthorButtons = () => { 
	let res = http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`)
	// console.log('权限按钮', res.then(res => console.log(res)));
	// {code: 200, data: {useHooks: {add: true, delete: true}}, msg: '成功'}
	return res
};

// * 获取菜单列表
export const getMenuList = () => {
	let res = http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`)
	// console.log('菜单', res.then(res => console.log(res)));
	// {code: 200, data: Array(10), msg: '成功'}
	return res;
};

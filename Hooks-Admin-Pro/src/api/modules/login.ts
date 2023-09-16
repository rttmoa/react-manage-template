import http from "@/api";
import { AuthState } from "@/redux/interface";
import { PORT1 } from "@/api/config/servicePort";
import { ReqLogin, ResLogin } from "@/api/interface/index";
import authMenuList from "@/assets/json/authMenuList.json";
import authButtonList from "@/assets/json/authButtonList.json";

/**
 * @name AuthModule
 */
// 用户登陆
export const loginApi = (params: ReqLogin) => {
  // console.log(http.post<ResLogin>(PORT1 + `/login`, params).then(res => console.log('login2', res)));
  return http.post<ResLogin>(PORT1 + `/login`, params);
  // return http.post<ResLogin>(PORT1 + `/login`, params, { loading: false });
  // return http.post<ResLogin>(PORT1 + `/login`, {}, { params });
  // return http.post<ResLogin>(PORT1 + `/login`, qs.stringify(params));
  // return http.get<ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`);
};

// todo 获取菜单列表
export const getAuthMenuListApi = () => {
  // console.log(http.get<AuthState["authMenuList"]>(PORT1 + `/menu/list`).then(res => console.log("菜单列表", res)));
  return http.get<AuthState["authMenuList"]>(PORT1 + `/menu/list`);
};

// 获取按钮权限
export const getAuthButtonListApi = () => {
  // console.log(http.get<AuthState["authButtonList"]>(PORT1 + `/auth/buttons`).then(res => console.log("res", res)));
  return http.get<AuthState["authButtonList"]>(PORT1 + `/auth/buttons`);
};

// 用户退出
export const logoutApi = () => {
  // console.log(http.post(PORT1 + `/logout`, {}, { loading: true }).then(res => console.log('退出', res)));
  return http.post(PORT1 + `/logout`, {}, { loading: true });
};

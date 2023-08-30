import http from "@/api";
import { AuthState } from "@/redux/interface";
import { PORT1 } from "@/api/config/servicePort";
import { ReqLogin, ResLogin } from "@/api/interface/index";
import authMenuList from "@/assets/json/authMenuList.json";
import authButtonList from "@/assets/json/authButtonList.json";

/**
 * @name AuthModule
 */
// User login
export const loginApi = (params: ReqLogin) => {
  // console.log(http.post<ResLogin>(PORT1 + `/login`, params).then(res => console.log(res)));
  return http.post<ResLogin>(PORT1 + `/login`, params);
  // return http.post<ResLogin>(PORT1 + `/login`, params, { loading: false });
  // return http.post<ResLogin>(PORT1 + `/login`, {}, { params });
  // return http.post<ResLogin>(PORT1 + `/login`, qs.stringify(params));
  // return http.get<ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`);
};

// Get menu list
export const getAuthMenuListApi = () => {
  return http.get<AuthState["authMenuList"]>(PORT1 + `/menu/list`);
  return authMenuList; // JSON中的菜单列表
};

// Get button permissions
export const getAuthButtonListApi = () => {
  return http.get<AuthState["authButtonList"]>(PORT1 + `/auth/buttons`);
  return authButtonList; // JSON中的按钮权限
};

// User logout
export const logoutApi = () => {
  return http.post(PORT1 + `/logout`, {}, { loading: true });
};

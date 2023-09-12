import { ReqPage, ResPage, UserList } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name UserModule
 */
// Get user list
export const getUserList = (params: ReqPage) => {
  // console.log(http.post<ResPage<UserList>>(PORT1 + `/user/list`, params).then(res => console.log("用户列表", res)));
  return http.post<ResPage<UserList>>(PORT1 + `/user/list`, params);
};

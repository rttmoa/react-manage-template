/* eslint-disable import/no-anonymous-default-export */



/***--- 供 Request 模块使用 ---**/
export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  
  logoutUser: '/user/logout', // 用户退出
  loginUser: 'POST /user/login', // 用户登陆

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',
}

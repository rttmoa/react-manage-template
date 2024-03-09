
// 则 /mock 目录中的 todos.ts, items.ts 和 users.ts 就会被 Umi 视为 Mock 文件 来处理
// 就声明了两个 Mock 接口，透过 GET /api/users 可以拿到一个带有两个用户数据的数组，透过 GET /api/users/1 可以拿到某个用户的模拟数据。
export default {
 

  // 返回值可以是数组形式
  'GET /api/users': [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' }
  ],

  // 返回值也可以是对象形式
  'GET /api/users/1': { id: 1, name: 'foo' },

  // 当 HTTP 的请求方法是 GET 时，可以省略方法部分，只需要路径即可，例如：
  '/api/users/2': { id: 1, name: 'foo' },

  'POST /api/users': { result: 'true' },

  'PUT /api/users/1': { id: 1, name: 'new-foo' },


  'POST /api/users/create': (req: any, res: { setHeader: (arg0: string, arg1: string) => void; end: (arg0: string) => void; }) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  }

}
/* eslint-disable import/no-anonymous-default-export */
import { history } from 'umi'
import api from 'api' // todo post请求  查看封转的axios
import allApi from '../../services'
// console.log(allApi)

const { pathToRegexp } = require('path-to-regexp')

const { loginUser } = api

export default {
  namespace: 'login',

  state: {},

  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/login').exec(location.pathname)) { }
  //     })
  //   },
  // },
  effects: {
    // todo 登陆页中： dispatch({ type: "login/login", payload: {username: 'admin', password: 'admin'}})
    *login({ payload }, { put, call, select }) {
      // test
      // console.log(yield call(loginUser, payload)) // todo  yield call 发起请求
      // console.log(yield select(v => console.log(v))) // todo yield select 获取所有 state 数据
      // return
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select((_) => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' }) // todo yield put ->  dispatch地址 namespace: "app"   effects: "query"
        if (!pathToRegexp('/login').exec(from)) {
          if (['', '/'].includes(from)) history.push('/dashboard')
          else history.push(from)
        } else {
          history.push('/dashboard')
        }
      } else {
        throw data
      }
    },
  },
}

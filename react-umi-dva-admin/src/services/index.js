import { request } from 'utils/request'
import { apiPrefix } from '../utils/config'
import api from './api'
// console.log(api)

// todo  api: resolve(__dirname, './src/services/')

const gen = (params) => {
  let url = apiPrefix + params
  let method = 'GET'

  // 默认为GET、如果是其他POST、PATCH、DELETE请求  将method和url重新赋值
  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function (data) {
    // 闭包：等待 传参
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  const apiValue = api[key]
  APIFunction[key] = gen(apiValue)
}

APIFunction.queryWeather = (params) => {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${apiPrefix}/weather/now.json`,
    data: params,
  })
}
// console.log(APIFunction)

export default APIFunction

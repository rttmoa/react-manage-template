import { request, config } from 'utils'

const { api } = config
const { dashboard } = api




export function query(params) {
  // console.log("面板 query", params)
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}

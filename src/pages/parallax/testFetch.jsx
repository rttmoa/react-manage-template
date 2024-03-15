/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import { getFetch, useGetFetch, postFetch, usePostFetch } from '@src/service'
import axiosjs from '@src/service/axios'



const TestFetch = () => {
  console.log('(==================== 自动刷新 =====================)')

  // ! axios.js
  // let data = axiosjs({url: "https://mock.apifox.com/m1/3219319-0-default/fetch/btn"})

  // ! fetch.js - GET
  // let dataFetch = getFetch("https://mock.apifox.com/m1/3219319-0-default/fetch/btn", {
  //   params: { City: "成都"},
  //   headers: "'Content-Type': 'application/json'",
  //   timeout: 50000,
  //   payload: {"name": "中国", "age": 22},
  // })
  // console.log("最终结果：", dataFetch)


  // ! useFetch.js - GET
  // let dataUseFetch = useGetFetch("https://mock.apifox.com/m1/3219319-0-default/fetch/btn", {
  //   params: { City: "北京"},
  //   headers: "'Content-Type': 'application/json'",
  //   timeout: 50000,
  //   payload: {"name": "中国", "age": 22},
  // })
  // console.log("最终结果：", dataUseFetch)

  // ! fetch.js - POST
  // postFetch("https://mock.apifox.com/m1/3219319-0-default/fetch/btn/post", {
  //   params: { City: "北京"},
  //   headers: "'Content-Type': 'application/json'",
  //   timeout: 50000,
  //   payload: {"name": "中国", "age": 22},
  // }).then(results => console.log("最终结果POST1：", results))

  // ! useFetch.js - POST
  // let dataUsePostFetch = usePostFetch("https://mock.apifox.com/m1/3219319-0-default/fetch/btn/post", {
  //       params: { City: "北京"},
  //     headers: "'Content-Type': 'application/json'",
  //     timeout: 50000,
  //     payload: {"name": "中国", "age": 22},
  // })
  // console.log(dataUsePostFetch)





  // ? 传递接口添加参数

  const onClick = () => { console.log(123) }
  return (
    <div>
      <div>测试请求 Fetch</div>
      <button onClick={onClick}>点击请求</button>
    </div>
  )
}

export default TestFetch

/* eslint-disable prefer-const */
// https://axios-http.com/
// https://axios-http.com/docs/cancellation
// https://www.npmjs.com/package/axios-retry
import axios from 'axios'
import { useEffect, useState } from 'react'

// ! 此函数不需要传递其他参数： GET方式
const useFetcher = ({ url }) => {
  const [state, setState] = useState({ data: null, error: null, status: 'idle' })
  // 2.3 useEffect和useLayoutEffect区别
  // 简单来说就是调用时机不同，useLayoutEffect和原来的componentDidMount & componentDidUpdate一致，
  // 在react完成DOM更新后马上同步调用的代码，会阻塞页面渲染，而useEffect是会在整个页面渲染完才会调用的代码。 官方建议先使用useEffect

  // 在实际使用时如果想避免页面抖动，可以把Dom操作的代码放到useLayoutEffect中。这里的修改会一次性渲染，避免重绘代价。
  useEffect(() => {
    const controller = new AbortController() // ?
    let shouldSetData = true
    setState({ data: null, error: null, status: 'loading' })
    ;(async () => {
      try {
        const response = await axios.get(url, { signal: controller.signal })
        if (shouldSetData) {
          setState({ data: response, error: null, status: 'resolved' })
        }
      } catch (error) {
        if (shouldSetData) {
          setState({ data: null, error, status: 'errored' })
        }
      }
    })()
    console.log('axiosjs 执行')
    // 当useEffect销毁时
    return () => {
      console.log('axiosjs 组件销毁')
      shouldSetData = false
      controller.abort()
    }
  }, [url])

  return state
}
// const data = useFetcher({url: "https://my-json-server.typicode.com/wkylin/angular-json-server/react"})
export default useFetcher

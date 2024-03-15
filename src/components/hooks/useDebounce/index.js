/* eslint-disable prettier/prettier */
import { useRef, useEffect, useCallback } from 'react'

// ? 防抖
// 每次触发定时器后，取消上一个定时器，然后重新触发定时器。
// 防抖一般用于用户未知行为的优化，比如搜索框输入弹窗提示，
// 因为用户接下来要输入的内容都是未知的，所以每次用户输入就弹窗是没有意义的，需要等到用户输入完毕后再进行弹窗提示。
const useDebounce = (fn, delay) => {
  const timerRef = useRef(null)
  const fnRef = useRef(fn)

  fnRef.current = fn

  useEffect(() => () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  },[])

  const fnDebounced = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        const that = this
        fnRef.current.apply(that, args)
      }, delay)
    },
    [delay]
  )

  return fnDebounced
}

export default useDebounce

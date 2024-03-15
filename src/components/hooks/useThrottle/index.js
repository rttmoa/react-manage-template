/* eslint-disable prettier/prettier */





// ? 节流：
// 每次触发定时器后，直到这个定时器结束之前无法再次触发。
// 一般用于可预知的用户行为的优化，比如为scroll事件的回调函数添加定时器。
const useThrottle = (func, delay = 1000) => {
  let prev = 0
  return (...args) => {
    const now = new Date().getTime()
    if (now - prev > delay) {
      prev = now
      return func(...args)
    }
  }
}

export default useThrottle

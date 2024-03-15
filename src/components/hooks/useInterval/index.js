import { useEffect, useRef } from 'react'

// ? 定时器
const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null && typeof delay === 'number') {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval

// const timer = useInterval(() => {
// console.log(123)
// }, 2000)

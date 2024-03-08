/* eslint-disable import/no-anonymous-default-export */
import { message } from 'antd'

export default {
  onError(e, a) {
    e.preventDefault()
    if (e.message) {
      message.error(e.message)
    } else {
      console.error(e)
    }
  },
}

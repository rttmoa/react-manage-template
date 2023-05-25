import { message } from 'antd'




// eslint-disable-next-line import/no-anonymous-default-export
export default {
  onError(e, a) {
    e.preventDefault();
    if (e.message) {
      message.error(e.message)
    } else {
      console.error(e)
    }
  },
}

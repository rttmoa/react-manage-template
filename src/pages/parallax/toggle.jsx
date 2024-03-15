import React, { useState } from 'react'
import { Alert } from 'antd'
import { useTransition, animated } from '@react-spring/web'
import { config } from '@react-spring/core'
import Img1 from '@assets/images/20659811.jpg'
import Img2 from '@assets/images/655c2ae1.jpg'

const Toggle = () => {
  const [toggle, setToggle] = useState(false)
  const transitions = useTransition(toggle, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: toggle,
    delay: 200,
    config: config.molasses,
    onRest: () => setToggle(!toggle),
  })
  // 可以变成图片
  return transitions(({ opacity }, item) =>
    item ? (
      <animated.div
        style={{
          position: 'absolute',
          opacity: opacity.to({ range: [0.0, 1.0], output: [0, 1] }),
        }}
      >
        {/* <Alert
          message="Success Tips"
          description="Detailed description and advice about successful copywriting."
          type="success"
          showIcon
        /> */}
        <img src={Img1} style={{ height: '100%' }} />
      </animated.div>
    ) : (
      <animated.div
        style={{
          position: 'absolute',
          opacity: opacity.to({ range: [1.0, 0.0], output: [1, 0] }),
        }}
      >
        {/* <Alert
          message="Informational Notes"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
        /> */}
        <img src={Img2} style={{ height: '100%' }} />
      </animated.div>
    )
  )
}
export default Toggle

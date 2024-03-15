import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import Tilt from 'react-parallax-tilt'

import wkylinPng from '@assets/images/wkylin.png'

// ? 轻松在 React 组件上应用倾斜悬停效果: https://github.com/mkosir/react-parallax-tilt
const ReactTilt = () => (
  <FixTabPanel>
    <h3>Welcome to react tilt!</h3>
    <section style={{ width: 200, height: 200 }}>
      <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} perspective={1000} scale={1.1} glareEnable={true}>
        <img src={wkylinPng} alt="wkylin.w" width="200" height="200" />
      </Tilt>
    </section>
  </FixTabPanel>
)

export default ReactTilt

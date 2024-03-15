/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import screenfull from 'screenfull'
import { message, Space, Tooltip } from 'antd'
// import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

const FullScreen = ({ ele, tips = '全屏', placement = 'bottom' }: any) => {
  // eslint-disable-next-line no-unused-vars
  const [fullScreen, setFullScreen] = useState<boolean>(screenfull.isFullscreen)

  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) setFullScreen(true)
      else setFullScreen(false)
      return () => screenfull.off('change', () => {})
    })
  }, [])

  const handleFullScreen = () => {
    if (!screenfull.isEnabled) message.warning('当前您的浏览器不支持全屏')
    const dom = document.querySelector(ele) || undefined
    screenfull.toggle(dom)
  }
  return (
    <Tooltip placement={placement} title={tips}>
      <Space style={{ cursor: 'pointer' }} onClick={handleFullScreen}>
        {fullScreen ? (
          <div>1</div>
          // <FullscreenExitOutlined style={{ fontSize: 16 }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        ) : (
          <div>1</div>
          // <FullscreenOutlined style={{ fontSize: 16 }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
        )}
      </Space>
    </Tooltip>
  )
}
export default FullScreen

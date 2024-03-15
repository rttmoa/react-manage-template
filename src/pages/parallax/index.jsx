/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import BasicInfo from '@container/basicInfo'  // 分页组件
import LandingPage from '@container/landingPage' // 视频播放
import MusicPlayer from '@container/musicPlayer' // 音乐播放器
import Loading from '@stateless/Loading'
import Toggle from './toggle'
import TestFetch from './testFetch'




// ? 动画：两个卡片互换  （测试组件）
const ParallaxVert = () => {
  const onChange = () => {}
  return (
    <FixTabPanel>
      <h2>Hi, React Spring</h2>
      <div style={{marginBottom: '80px'}}><Toggle /></div>
      <br />
      <div className="test-block" style={{ fontSize: 16 }}>
        <h1><b>123</b></h1>

        {/* <BasicInfo /> */}
        {/* <LandingPage /> */}
        {/* <MusicPlayer /> */}
        {/* <Loading /> */}
        {/* <TestFetch /> */}

      </div>
    </FixTabPanel>
  )
}

export default ParallaxVert

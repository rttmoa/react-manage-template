import React from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import MusicPlayer from '@container/musicPlayer/index'
import SongCard from '@container/musicPlayer/SongCard'
import songData from '@container/musicPlayer/songData/song'

// ? 音乐播放组件
const Music = () => (
  <FixTabPanel>
    <div style={{ width: 500 }}>
      <h3>Music Player</h3>
      <SongCard song={songData} />
      <MusicPlayer />
    </div>
  </FixTabPanel>
)

export default Music

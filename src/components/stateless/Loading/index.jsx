/* eslint-disable no-unused-vars */
import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const Loading = () => <Spin indicator={antIcon} />

// const Loading = () => <Spin fullscreen size="large" />

export default Loading

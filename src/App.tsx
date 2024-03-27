/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom/dist/index'
import Watermark from '@stateless/Watermark'
import rootRouter from './routers'
import AuthRouter from './routers/authRouter'
import { sentryInit } from './utils' // 性能监控

const App = () => {
  // const { i18n } = useTranslation()
  const [loading, setLoading] = useState(true)
  const asyncCall = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 300)) // 延迟几秒停止加载动画

  // Node()

  useEffect(() => {
    sentryInit()
    asyncCall()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
    // ? 添加水印
    Watermark({
      content: 'React Admin', // 水印文本
      container: document.getElementById('root'), // 水印容器区域
    })
  }, [])

  useEffect(() => {
    // const fetchUserLanguage = async () => {
    //   const userLanguage = await fetchUserLanguageFromDatabase() // 从数据库中获取用户的语言选择
    //   if (userLanguage) {
    //     i18n.changeLanguage(userLanguage) // 如果数据库中存在用户的语言选择，则使用该选择作为应用程序的语言
    //   } else {
    //     const localStorageLanguage = localStorage.getItem('language') // 如果数据库中不存在用户的语言选择，则检查本地存储
    //     if (localStorageLanguage) {
    //       i18n.changeLanguage(localStorageLanguage) // 如果本地存储中存在用户的语言选择，则使用该选择作为应用程序的语言
    //     }
    //   }
    // }
    // fetchUserLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const element = useRoutes(rootRouter as any)

  if (loading) return null
  return <AuthRouter>{element}</AuthRouter>
}

export default App

import React, { createContext, useContext, useState, useMemo } from 'react'

const defaultTheme = 'light'
type ThemeContextType = {
  myTheme: string
  setMyTheme: Function
}
const ProThemeContext = createContext<ThemeContextType | null>(null)
const useProThemeContext = () => useContext(ProThemeContext)

const ProThemeProvider = ({ children }: any) => {
  const [myTheme, setMyTheme] = useState(defaultTheme)
  // console.log("theme/hooks");
  const themeProvider = useMemo(
    () => ({
      myTheme,
      setMyTheme,
    }),
    [myTheme, setMyTheme]
  )
  return <ProThemeContext.Provider value={themeProvider}>{children}</ProThemeContext.Provider>
  // 方式二：测试 useMemo
  // return <ProThemeContext.Provider value={{ myTheme, setMyTheme }}>{children}</ProThemeContext.Provider>
}

export { ProThemeProvider, useProThemeContext }

// /page/layout/proHeader
// import { useProThemeContext } from ''
// const { myTheme, setMyTheme } = useProThemeContext();
// const setAntdTheme = () => {
//   setMyTheme(myTheme === "light" ? 'dark' : 'light')
// }

/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
import React from 'react'
import styles from './index.module.less'



// ? 水平居中 组件
const AlignCenter = ({ children }) => {
  return <div className={styles.alignCenter}>
    {children}
  </div>
}

export default AlignCenter

// 使用：
// <AlignCenter>
//  <h1>hello world</h1>
//  <Form>...</Form>
// </AlignCenter>

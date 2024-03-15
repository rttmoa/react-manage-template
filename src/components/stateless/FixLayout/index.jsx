/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import React from 'react'

const FixLayout = ({ children }) => {
  return <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
    {children}
  </div>
}

export default FixLayout

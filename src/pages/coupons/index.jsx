import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'

// ? 路由跳转 传参
const Coupons = () => {
  const navigate = useNavigate()
  const redirectTo = (path) => {
    navigate(path)
  }

  return (
    <FixTabPanel>
      <Button type="primary" style={{ margin: 10 }} onClick={() => redirectTo('/')}>
        Home Coupons
      </Button>
      123
      <Button type="text" style={{ margin: 10 }} onClick={() => redirectTo('coupons/add')}>
        Add Coupons222
      </Button>
      <Button style={{ margin: 10 }} onClick={() => redirectTo('coupons/edit?id=1')}>
        Edit Coupons
      </Button>
      <Button type="dashed" style={{ margin: 10 }} onClick={() => redirectTo('coupons/detail?id=2')}>
        Detail Coupons
      </Button>
    </FixTabPanel>
  )
}

export default Coupons

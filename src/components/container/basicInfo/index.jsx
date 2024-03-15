/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react'
import { Pagination } from 'antd'
// import { Pagination } from 'antd/lib/pagination'
// import { Pagination } from 'antd/es/pagination'



// ? 分页组件
const BasicInfo = () => {
  const onShowSizeChange = () => { }
  const onChange = () => { }
  return (
    <>
      <Pagination
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
        defaultCurrent={6}
        total={500}
        showTotal={(total) => `总共 ${total} 个项目`}
        onChange={onChange}
        // disabled
      />
    </>
  )
}

export default BasicInfo

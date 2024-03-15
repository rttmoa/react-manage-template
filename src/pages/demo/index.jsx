/* eslint-disable prettier/prettier */
import React from 'react'
import { reqFetch, useReqFetch } from '@src/service'
import { Select, Table, Cascader, Space } from 'antd'
import FixTabPanel from '@stateless/FixTabPanel'
import { toFixed } from '@utils/aidFn'

import FileUpload from './fileUpload'
import TsDemo from './tsDemo'

// Table['columns']
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

// Cascader 级联选择 配置项
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

const viteEnvMode = import.meta?.env?.MODE ?? 'webapck env'
const viteEnvVariableValue = import.meta?.env?.VITE_GREETINGS ?? 'webapck env'

const ProDemo = () => {
  const [res, loading, error] = useReqFetch('https://my-json-server.typicode.com/wkylin/angular-json-server/react', {
    method: 'GET',
  })

  const onFetch = () => {
    reqFetch('/faker/shops', { method: 'GET' })
      .then((response) => {
        console.log(response)
      })
      .catch((errors) => {
        console.log('error', errors)
      })
  }
  return (
    <FixTabPanel>
      <h2>
        项目文档<span style={{ fontSize: 12, color: '#999', margin: '0 10px' }}>待完善</span>
      </h2>
      <h4>Mock API 示例</h4>
      <h4>
        <b>useFetch:</b> {loading ? 'Loading...' : error ? 'error' : JSON.stringify(res, null, 2)}
      </h4>
      <div onClick={onFetch} aria-hidden="true">
        ErrorBoundary
      </div>
      <br />
      <hr />
      {/* TODO: 上传图片 */}
      <h4><b>File Upload</b></h4>
      <FileUpload />

      <h4><b>TS 支持</b></h4>
      <TsDemo />

      <h4><b>Table</b></h4>
      <Table columns={columns} dataSource={[{name:'1',age:2,address:'3'}]} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />

      <h4><b>Cascader 级联选择 + 选择框</b></h4>
      <Cascader options={options} expandTrigger="hover" placeholder="Please select" />

      <Select placeholder="Select a person" optionFilterProp="children">
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
        <Select.Option value="tom">Tom</Select.Option>
      </Select>
      保留两位小数：{toFixed(0.75 * 100, 2)}
      <h3><b>Vite Env</b></h3>
      <Space>Mode: {viteEnvMode}</Space>
      <br />
      <Space>Variable value: {viteEnvVariableValue}</Space>

      <div style={{ height: 1000 }}><b>Height For Scroll</b></div>
    </FixTabPanel>
  )
}

export default ProDemo

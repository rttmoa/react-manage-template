/* eslint-disable valid-jsdoc */
import React from 'react'
import { request } from 'utils'
import { apiPrefix } from 'utils/config'
import {
  Row,
  Col,
  Select,
  Form,
  Input,
  Button,
  List,
  Tag,
  Checkbox,
} from 'antd'
import classnames from 'classnames'
import { CloseOutlined } from '@ant-design/icons'
import { Trans } from '@lingui/macro'
import api from '@/services/api'
import { Page } from 'components'
import styles from './index.less'

const { Option } = Select
const InputGroup = Input.Group
const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']

const methodTagColor = {
  GET: 'green',
  POST: 'orange',
  DELETE: 'red',
  PUT: 'geekblue',
}

const requests = Object.values(api).map((item) => {
  let url = apiPrefix + item
  let method = 'GET'
  const paramsArray = item.split(' ')

  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }
  // console.log(item) //  /user  ||  POST /user
  // console.log(paramsArray)  //  ['/user/:id']  ||  ['DELETE', '/user/:id']
  // console.log(method) // GET
  // apiPrefix：/api/v1
  // console.log(url) // /api/v1/user/:id
  return {
    method,
    url,
  }
})

let uuid = 2
class RequestPage extends React.Component {
  formRef = React.createRef()

  constructor(props) {
    super(props)
    this.state = {
      method: 'GET',
      url: '/api/v1/routes',
      keys: [1],
      result: null,
      visible: true,
    }
  }

  handleRequest = () => {
    const { method, url } = this.state

    this.formRef.current
      .validateFields()
      .then((values) => {
        // values: { check[1]: true, key[1]: 'username', value[1]: 'admin' }

        const params = {}
        for (let i in values) {
          if (i.startsWith('check')) {
            // 第一步：参数中，Check状态是true的
            const index = i.match(/check\[(\d+)\]/)[1]
            // 第二步：获取key和value添加到params中
            const key = values[`key[${index}]`]
            params[key] = values[`value[${index}]`]
          }
        }
        // 第三步：发请求
        request({ method, url, data: params }).then((data) => {
          this.setState({
            result: JSON.stringify(data),
          })
        })
      })
      .catch((errorInfo) => {
        console.log(errorInfo)
        /*
        errorInfo:
          {
            values: {
              username: 'username',
              password: 'password',
            },
            errorFields: [
              { password: ['username'], errors: ['Please input your Password!'] },
            ],
            outOfDate: false,
          }
        */
      })
  }

  handleClickListItem = ({ method, url }) => {
    this.setState({
      method,
      url,
      keys: [uuid++],
      result: null,
    })
  }

  handleInputChange = (e) => {
    this.setState({
      url: e.target.value,
    })
  }

  handleSelectChange = (method) => {
    this.setState({ method })
  }

  handleAddField = () => {
    const { keys } = this.state
    const nextKeys = keys.concat(uuid)
    uuid++
    this.setState({
      keys: nextKeys,
    })
  }

  handleRemoveField = (key) => {
    const { keys } = this.state
    this.setState({
      keys: keys.filter((item) => item !== key),
    })
  }

  handleVisible = () => {
    // 是否显示参数Params
    this.setState({
      visible: !this.state.visible,
    })
  }

  render() {
    const { result, url, method, keys, visible } = this.state

    return (
      <Page inner>
        <Row>
          <Col lg={8} md={24}>
            {/* List 渲染GET、POST、DELETE请求参数和请求地址 */}
            <List
              className={styles.requestList}
              dataSource={requests}
              renderItem={(item) => (
                <List.Item
                  className={classnames(styles.listItem, {
                    [styles.lstItemActive]:
                      item.method === method && item.url === url,
                  })}
                  onClick={this.handleClickListItem.bind(this, item)}
                >
                  <span style={{ width: 72 }}>
                    <Tag
                      style={{ marginRight: 8 }}
                      color={methodTagColor[item.method]}
                    >
                      {item.method}
                    </Tag>
                  </span>
                  {item.url}
                </List.Item>
              )}
            />
          </Col>
          <Col lg={16} md={24}>
            {/* 右侧 - GET + URL + Params + Send */}
            <Row type="flex" justify="space-between">
              <InputGroup compact size="large" style={{ flex: 1 }}>
                <Select
                  size="large"
                  value={method}
                  style={{ width: 100 }}
                  onChange={this.handleSelectChange}
                >
                  {methods.map((item) => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                <Input
                  value={url}
                  onChange={this.handleInputChange}
                  style={{ width: 'calc(100% - 200px)' }}
                />
                <Button
                  ghost={visible}
                  type={visible ? 'primary' : ''}
                  onClick={this.handleVisible}
                  size="large"
                >
                  <Trans>Params</Trans>
                </Button>
              </InputGroup>
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={this.handleRequest}
              >
                <Trans>Send</Trans>
              </Button>
            </Row>
            {/* 添加参数 + 请求结果 */}
            <Form ref={this.formRef} name="control-ref">
              <div
                className={classnames(styles.paramsBlock, {
                  [styles.hideParams]: !visible,
                })}
              >
                {keys.map((key, index) => (
                  <Row
                    gutter={8}
                    type="flex"
                    justify="start"
                    align="middle"
                    key={key}
                  >
                    <Col style={{ marginTop: 8 }}>
                      <Form.Item name={`check[${key}]`} valuePropName="checked">
                        <Checkbox defaultChecked />
                      </Form.Item>
                    </Col>
                    <Col style={{ marginTop: 8 }}>
                      <Form.Item name={`key[${key}]`}>
                        <Input placeholder="Key" />
                      </Form.Item>
                    </Col>
                    <Col style={{ marginTop: 8 }}>
                      <Form.Item name={`value[${key}]`}>
                        <Input placeholder="Value" />
                      </Form.Item>
                    </Col>
                    <Col style={{ marginTop: 8 }}>
                      <CloseOutlined
                        onClick={this.handleRemoveField.bind(this, key)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Col>
                  </Row>
                ))}
                <Row style={{ marginTop: 8 }}>
                  <Button onClick={this.handleAddField}>
                    <Trans>Add Param</Trans>
                  </Button>
                </Row>
              </div>
            </Form>
            <div className={styles.result}>{result}</div>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default RequestPage

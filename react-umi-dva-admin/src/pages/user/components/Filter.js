/* eslint-disable valid-jsdoc */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { FilterItem } from 'components'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { Button, Row, Col, DatePicker, Form, Input, Cascader } from 'antd'
import city from '../../../utils/city'

const { Search } = Input // 输入框+按钮 组件
const { RangePicker } = DatePicker; // 日历 组件
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}
const TwoColProps = {
  ...ColProps,
  xl: 96,
}




class Filter extends Component {

  formRef = React.createRef()

  // 处理 - 名字，地址，创建时间
  handleFields = (fields) => {
    const { createTime } = fields
    if (createTime && createTime.length) {
      fields.createTime = [
        dayjs(createTime[0]).format('YYYY-MM-DD'),
        dayjs(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  /** #### 搜索条件搜索内容  */
  handleSubmit = () => {
    // console.log("submit", this.props)
    const { onFilterChange } = this.props;
    const values = this.formRef.current.getFieldsValue()
    // console.log("getFieldsValue", values) // {address: ['北京', '北京市', '西城区'], createTime: ['国际化时间', '国际化时间'], name: "zhangsan"}
    const fields = this.handleFields(values)
    onFilterChange(fields)
  }

  /** #### 重置表头过滤条件 ResetProps  */
  handleReset = () => {
    const fields = this.formRef.current.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        // console.log("fileds+item", fields, item) // 如果存在就处理
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    this.formRef.current.setFieldsValue(fields) // 设置 字段值为处理后的值
    this.handleSubmit() // 重新提交
  }

  handleChange = (key, values) => {
    const { onFilterChange } = this.props;
    let fields = this.formRef.current.getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }




  render() {
    const { onAdd, filter } = this.props;
    const { name, address } = filter;

    let initialCreateTime = [];
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = dayjs(filter.createTime[0]);
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = dayjs(filter.createTime[1]);
    }

    return (
      <Form ref={this.formRef} name="control-ref"
        initialValues={{ name, address, createTime: initialCreateTime }}
      >
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="name">
              <Search
                placeholder={t`Search Name`}
                onSearch={this.handleSubmit}
              />
            </Form.Item>
          </Col>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }} id="addressCascader">
            <Form.Item name="address">
              <Cascader
                style={{ width: '100%' }}
                options={city}
                placeholder={t`Please pick an address`}
              />
            </Form.Item>
          </Col>
          <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} id="createTimeRangePicker">
            <FilterItem label={t`CreateTime`}>
              <Form.Item name="createTime">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </FilterItem>
          </Col>
          <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
            <Row type="flex" align="middle" justify="space-between">
              <div>
                <Button type="primary" htmlType="submit" className="margin-right" onClick={this.handleSubmit}>
                  <Trans>Search</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>Reset</Trans>
                </Button>
              </div>
              <Button type="primary" onClick={onAdd}>
                <Trans>Create</Trans>
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter

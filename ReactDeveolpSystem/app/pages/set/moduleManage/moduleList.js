import React, { Component } from 'react'
import { Table, Popconfirm } from 'antd'






export default class ModuleList extends Component {
  state = {

  }

  renderColumn() {
    const {onDelete, onModify, onUpdataStatus, onAddNode, buttonList} = this.props;
    return [{
        title: '功能',
        dataIndex: 'resName',
        width: '40%',
        key: 'resName',
        render: function (text, record, index) {
          return <b>{text}</b>
        },
      },{
        title: '操作',
        width: '40%',
        key: 'operation',
        render: (text, record, index) => (
          <span>
            <a onClick={() => onAddNode(record.id)}>新增</a>
            <span className="ant-divider" />
            <a onClick={() => onModify(record.id, record.parentid)}>修改</a>
            {text.children && text.children.length > 0 ? null : (
                <span>
                  <span className="ant-divider" />
                  <Popconfirm title="删除?" onConfirm={() => onDelete(record.id)}><a>删除</a></Popconfirm>
                </span>
            )}
            {record.resName !== '模块管理' ? (
                <span>
                  <span className="ant-divider" />
                  <Popconfirm title={`确定${text.status ? '显示' : '隐藏'}该模块?`} onConfirm={() => onUpdataStatus(text.id, `${text.status ? 0 : 1}`)}>
                    <a>{text.status ? '显示模块' : '隐藏模块'}</a>
                  </Popconfirm>
                </span>
            ) : null}
            <span className="ant-divider" />
            <a onClick={() => buttonList(record.id, record.parentid)}>按钮权限</a>
          </span>
        ),
      },{
        title: '状态',
        width: '20%',
        render: function (text, record, index) {
          let succ = <span className="success">已上线</span>
          let err = <span className="error">未上线</span>
          return record.resName !== '模块管理' ? <span>{record.status ?  err : succ }</span> : succ;
        },
      },
    ]
  }

  render() {
    const { dataSource, loading /* , scroll */ } = this.props;
    return (
      <div className="table-scrollfix">
        <Table
          columns={this.renderColumn()}
          dataSource={dataSource}
          loading={loading}
          scroll={{ y: true }}
          pagination={false}
          bordered
          rowKey="id"
        />
      </div>
    )
  }
}

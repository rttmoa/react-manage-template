import React, { Component } from 'react'
import { Button, Spin, Row, Col } from 'antd'
import Drawer from '@components/draw/draw'
import { fetchButtonList, fetchChangeModuleStatus } from '@apis/manage'





/***--- 按钮权限列表 ---**/
export default class pop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      loading: false,
      dataSource: [],
    }
    this.change = this.change.bind(this)
    this.saveChecked = this.saveChecked.bind(this)
    this.selectChecked = this.selectChecked.bind(this)
  }

  // 用于在组件挂载（插入DOM树）之前执行一些操作
  componentWillMount() {
    this.state.selectedRowKeys = this.props.checkedIdArr[this.props.itemId] || []
    this.getList()
  }

  /***--- 当加载数据时，页面加载 ---**/
  getList() {
    this.setState({ loading: true }, () => {
      fetchButtonList({ id: this.props.itemId }, (result) => {
        const data = result.data.list
        const dataSource = []
        data.map((item) => {
          if (item.status === 0) {
            const { selectedRowKeys } = this.state
            selectedRowKeys.map((key) => {
              if (item.id === key) {
                item.checked = true
              }
            })
            dataSource.push(item)
          }
        })
        this.setState({
          loading: false,
          dataSource: dataSource,
        })
      })
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   this.getList()
  // }

  // 上线下线
  // showOrHide(id, val) {
  //   fetchChangeModuleStatus({ id: id, status: val }, (result) => {
  //     this.getList()
  //   })
  // }

  /***--- 底部全选按钮 ---**/
  selectChecked() {
    // console.log(this.state.dataSource);
    // const checkedArr = []
    this.state.dataSource.map((item) => {
      item.checked = true
      // checkedArr.push(item.id)
    })
    this.setState({})
    // this.props.saveChecked(checkedArr)
  }

  /***--- 按钮权限列表 保存按钮 ---**/
  saveChecked() {
    // const { selectedRowKeys } = this.state
    // if (selectedRowKeys.length === 0) {
    //   message.info('请选择可供用户使用的按钮权限')
    //   return
    // }
    const checkedArr = []
    this.state.dataSource.map((item) => {
      if (item.checked) {
        checkedArr.push(item.id)
      }
    })
    this.props.saveChecked(checkedArr)
  }

  /***--- 底部 全选，确定，取消 ---**/
  footer() {
    const { cancelButton } = this.props;
    return (
      <div>
        <Button type="primary" onClick={this.selectChecked}>全选</Button>
        <Button type="primary" onClick={this.saveChecked}>确定</Button>
        <Button onClick={cancelButton}>取消</Button>
      </div>
    )
  }

  /***--- 选择模块的事件 ---**/
  change(id, index) { // id=134, index=0
    const data = this.state.dataSource[index] // 先获取array[index]  
    data.checked = !data.checked // 第index号元素中 checked 取反
    this.setState({})
    // debugger
  }

  render() {
    const { visible, cancelButton, title } = this.props
    const { loading, dataSource } = this.state
    return (
      <Drawer
        visible={visible}
        title={title}
        onCancel={cancelButton}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <Spin spinning={loading}>
          <div className="buttonLayout-lzr">
            <Row gutter={8}>
              {dataSource.map((arr, i) =>
                (<Col span="12" key={i} >
                  <Button type={arr.checked ? 'primary' : 'ghost'} onClick={() => this.change(arr.id, i)} title={arr.resName}>
                    {arr.resName}
                  </Button>
                </Col>))}
            </Row>
          </div>
        </Spin>
      </Drawer>
    )
  }
}

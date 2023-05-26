/* eslint-disable valid-jsdoc */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history } from 'umi'
import { connect } from 'umi'
import { Row, Col, Button, Popconfirm } from 'antd'
import { t } from "@lingui/macro"
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'






@connect(({ user, loading }) => ({ user, loading }))
class User extends PureComponent {

  /***--- 处理表单内的值 ---**/
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    history.push({
      pathname,
      search: stringify({...query,...newQuery}, {arrayFormat: 'repeat'}),
      // search: ({...query,...newQuery}, {arrayFormat: 'repeat'}),
    })
  }

  handleDeleteItems = () => {
    const { dispatch, user } = this.props;
    const { list, pagination, selectedRowKeys } = user;

    dispatch({ type: 'user/multiDelete', payload: {ids: selectedRowKeys} }).then(() => {
      this.handleRefresh({
        page: list.length === selectedRowKeys.length && pagination.current > 1 ? pagination.current - 1 : pagination.current,
      })
    })
  }
  /***--- 弹出框 属性 ---**/
  get modalProps() {
    const { dispatch, user, loading } = this.props;
    const { currentItem, modalOpen, modalType } = user;

    return {
      item: modalType === 'create' ? {} : currentItem,
      open: modalOpen,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`user/${modalType}`],
      title: `${modalType === 'create' ? t`Create User` : t`Update User`}`,
      centered: true,
      onOk: data => {
        dispatch({ type: `user/${modalType}`, payload: data }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({type: 'user/hideModal'})
      },
    }
  }
  /***--- Table 属性 ---**/
  get listProps() {
    const { dispatch, user, loading } = this.props
    const { list, pagination, selectedRowKeys } = user

    return {
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'user/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page: list.length === 1 && pagination.current > 1 ? pagination.current - 1 : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'user/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }
  /***--- 过滤条件 属性 ---**/
  get filterProps() {
    const { location, dispatch } = this.props;
    const { query } = location;
    // debugger

    return {
      filter: {
        ...query,
      },
      onFilterChange: value => {
        // console.log("onFilterChange", value) // {address: ['北京', '北京市', '西城区'], createTime: ['2023-04-13', '2023-04-15'], name: "zhangsan"}
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }



  render() {
    const { user } = this.props;
    const { selectedRowKeys } = user;

    return (
      <Page inner>
        {/* http://localhost:7000/user?address=%E6%B5%B7%E5%A4%96&address=%E6%B5%B7%E5%A4%96&createTime=2023-05-18&createTime=2023-05-19&name=123 */}
        <h3>将Form表单中参数使用Ref获取到后，用history.push()到地址栏后，用dvajs(redux)获取最近数据传到组件中</h3>
        <Filter {...this.filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={this.m}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <h3>Table中可查看详情，可更新，可删除用户信息  可用dvajs控制数据，Loading，pagination，Model等</h3>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}
User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default User

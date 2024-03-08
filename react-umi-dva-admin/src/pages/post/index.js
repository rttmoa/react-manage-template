import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Tabs } from 'antd'
import { history } from 'umi'
import { stringify } from 'qs'
import { t } from '@lingui/macro'
import { Page } from 'components'
import List from './components/List'
const { TabPane } = Tabs

const EnumPostStatus = {
  UNPUBLISH: 1,
  PUBLISHED: 2,
}

@connect(({ post, loading }) => ({ post, loading }))
class Post extends PureComponent {
  handleTabClick = (key) => {
    const { pathname } = this.props.location
    // console.log("handleTabClick", key, pathname) // handleTabClick 2 /post

    // TODO: 切换 Tab，路由地址变化，dvajs中监听路由变化，并做相应的处理
    history.push({
      pathname,
      search: stringify({
        status: key,
      }),
    })
  }

  get listProps() {
    const { post, loading, location } = this.props
    const { list, pagination } = post
    const { query, pathname } = location

    // TODO: 状态改变，路由地址栏变化： http://localhost:40003/post?status=2&page=3&pageSize=10
    return {
      pagination,
      dataSource: list,
      loading: loading.effects['post/query'],
      onChange(page) {
        history.push({
          pathname,
          search: stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          }),
        })
      },
    }
  }

  render() {
    const { location } = this.props
    const { query } = location
    return (
      <Page inner>
        <h3>Tabs切换页面 history.push() 到路由中 获取到参数放到Table中</h3>
        <Tabs
          onTabClick={this.handleTabClick}
          activeKey={
            query.status === String(EnumPostStatus.UNPUBLISH)
              ? String(EnumPostStatus.UNPUBLISH)
              : String(EnumPostStatus.PUBLISHED)
          }
        >
          <TabPane tab={t`Publised`} key={String(EnumPostStatus.PUBLISHED)}>
            <List {...this.listProps} />
          </TabPane>
          <TabPane tab={t`Unpublished`} key={String(EnumPostStatus.UNPUBLISH)}>
            <List {...this.listProps} />
          </TabPane>
        </Tabs>
      </Page>
    )
  }
}
Post.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}
export default Post

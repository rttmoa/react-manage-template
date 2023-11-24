/* eslint-disable import/first */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'umi'
import { connect } from 'umi'
import { MyLayout, GlobalFooter } from '../components'
import { Drawer, FloatButton, Layout } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { config, getLocale } from '../utils'
import Error from '../pages/failure/404'
import styles from './PrimaryLayout.less'
import store from 'store'

const { pathToRegexp } = require("path-to-regexp")
const { Content } = Layout
const { Header, Bread, Sider } = MyLayout



// 主要布局
@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {

  // 根据enquire-js包 去判断是否是移动端
  state = {
    isMobile: false
  }
  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => { // moblie: true / undefined
      // console.log(mobile)
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({ isMobile: mobile })
      }
    })
  }
  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }
  // 展开关闭侧边栏
  onCollapseChange = collapsed => {
    // console.log(collapsed)
    this.props.dispatch({ type: 'app/handleCollapseChange', payload: collapsed,})
  }



  render() {
    const { app, location, dispatch, children } = this.props;
    const { theme, collapsed, notifications } = app;
    const user = store.get('user') || {};
    const permissions = store.get('permissions') || {};
    const routeList = store.get('routeList') || [];
    const { isMobile } = this.state;
    const { onCollapseChange } = this;

    // 本地化路线名称.
    const lang = getLocale();
    const newRouteList = lang !== 'en' ? routeList.map(item => {
      const { name, ...other } = item
      return {
        ...other,
        name: (item[lang] || {}).name || name,
      }
    }) : routeList

    // 查找与路径名匹配的路由
    const currentRoute = newRouteList.find(_ => _.route && pathToRegexp(_.route).exec(location.pathname))

    // 查询您是否有权限进入该页面
    const hasPermission = currentRoute ? permissions.visit.includes(currentRoute.id) : false

    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')

    const headerProps = {
      menus,
      collapsed,
      notifications,
      onCollapseChange,
      avatar: user.avatar,
      username: user.username,
      fixed: config ? config.fixedHeader : true,
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
    }

    const siderProps = {
      theme,
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }

    const drawerProps = {
      maskClosable: true,
      closable: false,
      placement: "left",
      width: 200,
      rootStyle: { padding: 0, height: '100vh'}
    }

    return (
      <>
        <Layout>
          {isMobile ? (
            <Drawer {...drawerProps} open={!collapsed} onClose={onCollapseChange.bind(this, !collapsed)}>
              <Sider {...siderProps} collapsed={false} />
            </Drawer>
          ) : <Sider {...siderProps} />}
          <div className={styles.container} style={{ paddingTop: config && config.fixedHeader ? 72 : 0 }} id="primaryLayout">
            <Header {...headerProps} />
            <Content className={styles.content}>
              <Bread routeList={newRouteList} />
              {hasPermission ? children : <Error />}
            </Content>
            <FloatButton.BackTop className={styles.backTop} target={() => document.querySelector('#primaryLayout')}/>
            <GlobalFooter className={styles.footer} copyright={config && config.copyright} />
          </div>
        </Layout>
      </>
    );
  }
}
PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}
export default PrimaryLayout

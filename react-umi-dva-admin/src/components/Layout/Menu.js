/* eslint-disable valid-jsdoc */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { NavLink, withRouter } from 'umi'
import { pathToRegexp } from 'path-to-regexp'
import { arrayToTree, queryAncestors } from '../../utils'
import iconMap from '../../utils/iconMap'
import store from 'store'

const { SubMenu } = Menu

/** #### TODO: 侧边栏 Menu处理  */
@withRouter
class SiderMenu extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || [], // openKeys: 当前展开的 SubMenu 菜单项 key 数组
  }

  // TODO: SubMenu 展开/关闭的回调
  onOpenChange = (openKeys) => {
    // console.log(openKeys) // ['5', '4']

    const rootSubmenuKeys = this.props.menus
      .filter((_) => !_.menuParentId)
      .map((_) => _.id) // 先过滤掉SubMenu
    // console.log('Menus', this.props.menus)
    // console.log('处理后的SubmenuKeys', rootSubmenuKeys) //  ['1', '2', '7', '3', '4', '5']

    const latestOpenKey = openKeys.find(
      (key) => this.state.openKeys.indexOf(key) === -1
    )
    // console.log("latestOpenKey", latestOpenKey) // "4" || "5"

    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }
    // console.log("newOpenKeys", newOpenKeys) // 三种结果：  []   ||   ['4']   ||   ['5']
    this.setState({ openKeys: newOpenKeys })
    store.set('openKeys', newOpenKeys)
  }

  // TODO: 处理侧边栏
  generateMenus = (data) => {
    // console.log(data) // menutree

    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <>
                {item.icon && iconMap[item.icon]}
                <span>{item.name}</span>
              </>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <NavLink to={item.route || '#'}>
            {item.icon && iconMap[item.icon]}
            <span>{item.name}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }

  render() {
    const { collapsed, theme, menus, location, isMobile, onCollapseChange } =
      this.props
    // console.log('菜单', menus)

    // TODO: 生成菜单内容的树形结构数据
    const menuTree = arrayToTree(menus, 'id', 'menuParentId')
    // console.log("menuTree", menuTree)

    // 查找与路径名匹配的菜单
    const currentMenu = menus.find(
      (_) => _.route && pathToRegexp(_.route).exec(location.pathname)
    )
    // console.log("路由：", location.pathname)    //   /request
    // console.log("当前匹配的菜单：", currentMenu) //   { breadcrumbParentId: "1", name: "Request", route: "/request" }

    // 根据当前菜单找到应该选择的按键
    const selectedKeys = currentMenu
      ? queryAncestors(menus, currentMenu, 'menuParentId').map((_) => _.id)
      : []
    // console.log(selectedKeys)

    const menuProps = collapsed ? {} : { openKeys: this.state.openKeys }
    // console.log(menuProps) // SubMenu的值

    return (
      <Menu
        mode="inline"
        theme={theme}
        // SubMenu 展开/关闭的回调： https://ant.design/components/menu-cn#menu
        onOpenChange={this.onOpenChange}
        selectedKeys={selectedKeys}
        onClick={
          isMobile
            ? () => {
                onCollapseChange(true)
              }
            : undefined
        }
        {...menuProps}
      >
        {this.generateMenus(menuTree)}
      </Menu>
    )
  }
}
SiderMenu.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  onCollapseChange: PropTypes.func,
}

export default SiderMenu

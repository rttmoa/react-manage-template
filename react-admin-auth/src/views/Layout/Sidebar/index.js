import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import IconSvg from 'components/Icon-svg';
// import { routes } from 'src/router/config'
import './index.less';
import connect from 'connect';
const { Content, Sider } = Layout;
const { SubMenu, Item } = Menu;


/** #### 常量可以放到Class组件外部  */


/** #### TODO: 处理侧边栏  */
@connect
@withRouter
class SideBar extends React.Component {

    onOpenChange = openKeys => {
        // console.log("openKeys", openKeys)
        let router = this.props.state.routes.filter(route => route.layout)
        this.props.setOpenKeys([openKeys.pop()]); // 移除最后一个数组元素
    }
    render () {
        let { collapsed, openKeys, breadCrumbs, routes } = this.props.state;
        let {location : { pathname }, history} = this.props;
        // console.log("routes", routes) 


        const createSubMenu = (route, pathname, history) => {
            const children = route.children.filter(route => !route.hidden)
            return (
                <SubMenu key={route.path} title={<span><Icon type={route.icon}/><span>{route.name}</span></span>}>
                    {children.map( item => {
                        let names = [route.name],
                            paths = [route.path];
                        return !item.children 
                        ? (
                            <Menu.Item key={item.path}>
                                <Link to={item.path} 
                                    onClick={e => { if (pathname !== item.path) history.push(item.path); e.preventDefault(); }
                                }>{item.name}</Link>
                            </Menu.Item>
                        ) : createSubMenu(item, pathname, history); // 如果children里面有children继续回调
                    })}
                </SubMenu>
            )
        }
        return (
            <div id="sidebar_wrapper">
                <Layout>
                    <Sider trigger collapsed={collapsed}>
                        <div className="logo">
                            <a target="_blank" style={{display: 'inline-block'}} href="https://github.com/cd-dongzi" alt="Github">
                                <IconSvg iconName="github" className="logo_github"/>
                            </a>
                        </div>
                        {/* Menu：https://3x.ant.design/components/menu-cn/#components-menu-demo-inline-collapsed */}
                        <Menu
                            mode="inline"
                            theme="dark"
                            onOpenChange={this.onOpenChange}
                            openKeys={openKeys}
                            selectedKeys={[breadCrumbs[breadCrumbs.length-1].path]}
                        >
                            {/* routes先过滤掉/login的，判断route中是否有children的 */}
                            {routes.filter(route => !route.hidden).map(route => {
                                if (!route.children) {
                                    // 如果没有children属性的，就渲染Menu，是 首页和权限管理
                                    return (
                                        <Menu.Item key={route.path}>
                                            <Link
                                                to={route.path} 
                                                onClick={e => {
                                                    if (pathname !== route.path) history.push(route.path);
                                                    e.preventDefault();
                                                }}
                                            >
                                                <Icon type={route.icon} />  
                                                <span>{route.name}</span>
                                            </Link>
                                        </Menu.Item>
                                    )
                                }
                                return createSubMenu(route, pathname, history)
                            })}
                        </Menu>
                    </Sider>
                </Layout>
            </div>
        )
    }
}
export default SideBar


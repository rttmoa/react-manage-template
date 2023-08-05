import React, { useState, useRef, useMemo } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Menu } from '@arco-design/web-react';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingBar from '../components/LoadingBar';
import { routes, defaultRoute } from '../routes';
import { isArray } from '../utils/is';
import history from '../history';
import useLocale from '../utils/useLocale';
import { ReducerState } from '../redux';
import getUrlParams from '../utils/getUrlParams';
import lazyload from '../utils/lazyload';
import styles from './style/layout.module.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;




/** ####  获取左侧边栏, 名称、key、图标、路径 (处理routes，处理pages下indextsx) */
function getFlattenRoutes() {
  const res = [];
  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.componentPath) {
        route.component = lazyload(() => import(`../pages/${route.componentPath}`));
        res.push(route);
      } 
      if(isArray(route.children) && route.children.length){
        travel(route.children)
      } 
    });
  }
  travel(routes);
  return res;
}

/** #### 处理 侧边栏Menu里面的内容  */
function renderRoutes(locale) {
  const nodes = [];
  function travel(_routes, level) {
    return _routes.map((route) => {
      const titleDom = (<>{route.icon} {locale[route.name] || route.name}</>); // 侧边栏名根据route去匹配
      // 网站设置子菜单
      if (route.component && (!isArray(route.children) || (isArray(route.children) && !route.children.length))) {
        if (level > 1) {
          return <MenuItem key={route.key}>{titleDom}</MenuItem>;
        }
        if (!route.hide) { 
          nodes.push(
            <MenuItem key={route.key}>
              {/* <Link to={`/${route.key}`}>{titleDom} 一</Link> */}
              <Link to={`/${route.key}`}>{titleDom}</Link>
            </MenuItem>
          );
        }
      }
      // 网站设置子菜单
      if (isArray(route.children) && route.children.length) {
        if (level > 1) {
          // 这个level表示，children下包含children，子菜单下的子菜单
          return (
            <SubMenu key={route.key} title={titleDom}>
              {travel(route.children, level + 1)}
            </SubMenu>
          );
        }
        nodes.push(
          <SubMenu key={route.key} title={titleDom}>
            {travel(route.children, level + 1)}
            {/* <MenuItem key="1">test</MenuItem> */}
          </SubMenu>
        );
      }
    });
  }
  travel(routes, 1);
  // console.log(nodes);
  // 所以Menu的结构为：
  // <Menu>
  //   <MenuItem>Welcome</MenuItem>
  //   <MenuItem>Articles</MenuItem>
  //   <SubMenu>
  //     <MenuItem>HomeConfig</MenuItem>
  //     <MenuItem>AsideConfig</MenuItem>
  //   </SubMenu>
  // </Menu>
  return nodes;
}

/** #### TODO: 界面布局  */
function PageLayout() {

  const locale = useLocale(); // 一套中文，一套英文    GlobalContext：全局Text解构出locale

  const urlParams = getUrlParams(); // console.log(urlParams ? '存在':'不存在')

  const pathname = history.location.pathname;   //  /about  /user
  const currentComponent = qs.parseUrl(pathname).url.slice(1); // 字符串截取
  const defaultSelectedKeys = [currentComponent || defaultRoute]; // Menu菜单默认Selectkeys: ['about' || 'welcome']
  const [selectedKeys, setSelectedKeys] = useState<string[]>(defaultSelectedKeys); // 高亮Menu项，根据地址栏选中 || 点击选中



  const { collapsed, settings } = useSelector((state: ReducerState) => state.global);

  const navbarHeight = 60;
  const menuWidth = collapsed ? 48 : settings.menuWidth;

  const showNavbar = settings.navbar && urlParams.navbar !== false;
  const showMenu = settings.menu && urlParams.menu !== false;
  const showFooter = settings.footer && urlParams.footer !== false;

  /** #### 处理后的路由，根据路由匹配内容  */
  const flattenRoutes = useMemo(() => getFlattenRoutes() || [], []);

  const loadingBarRef = useRef(null); // 进度条Ref

  /** #### 点击菜单MenuItem后处理  */
  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    loadingBarRef.current.loading();
    preload.then(() => {
      setSelectedKeys([key]);
      history.push(currentRoute.path ? currentRoute.path : `/${key}`);
      loadingBarRef.current.success();
    });
  }
  
  const dispatch = useDispatch();
  function toggleCollapse() { dispatch({ type: 'TOGGLE_COLLAPSED', payload: !collapsed }); }

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };



  return (
    <Layout className={styles.layout}>
      <LoadingBar ref={loadingBarRef} />
      {showNavbar && (<div className={styles.layoutNavbar}> <Navbar /> </div>)}
      <Layout>
        {showMenu && (
          // Sider：https://arco.design/react/components/layout
          // 展开关闭侧边栏
          <Sider
            className={styles.layoutSider}
            width={menuWidth}
            collapsed={collapsed}
            onCollapse={toggleCollapse}
            trigger={null}
            collapsible
            breakpoint="xl"
            style={paddingTop}
          >
            <div className={styles.menuWrapper}>
              {/* TODO: 展开关闭菜单（有属性children） */}
              <Menu collapse={collapsed} onClickMenuItem={onClickMenuItem} selectedKeys={selectedKeys} autoOpen={false}>
                {renderRoutes(locale)}
              </Menu>
            </div>
            <div className={styles.collapseBtn} onClick={toggleCollapse}>{collapsed ? <IconMenuUnfold /> : <IconMenuFold />}</div>
          </Sider>
        )}
        <Layout className={styles.layoutContent} style={paddingStyle}>
          <Content>
            <Switch>
              {flattenRoutes.map((route, index) => <Route exact key={index} path={`/${route.key}`} component={route.component} />)}
              <Redirect push to={`/${defaultRoute}`} />
            </Switch>
          </Content>
          {showFooter && <Footer />}
        </Layout>
      </Layout>
    </Layout>
  );
}

export default PageLayout;

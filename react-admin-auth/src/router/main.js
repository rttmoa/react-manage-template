import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {message} from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Progress 进度条样式
import Layout from 'views/Layout'
import {allRoutes, asyncRouterMap} from './config'
import {whiteList} from 'src/config'
import {diff_obj, filterRoutes} from '../utils'
import {Cookie, Local} from '../utils/storage'
import actions from 'actions'

    

// TODO: 在组件外部的变量保证变量不会改变的


/** #### TODO: route start  */
class MainComponents extends React.Component {
    componentWillMount () { // 函数的触发时机是在组件将要装载，在组件render之前调用
        NProgress.start()
        this.dataInit(this.props)
    }
    componentWillReceiveProps(nextProps){ // 一般用于父组件状态更新时子组件的重新渲染
        this.dataInit(nextProps)
    }
    componentDidUpdate () { // 只要页面的state或者model中的state中定义的变量值发生改变，这个方法就会执行
        NProgress.start()
    }
    /** ####  TODO: 数据初始化  （处理pathname：添加tabViews、添加BreadCrumbs、设置setOpenKeys）  */
    dataInit (props) {
        // console.log(props)
        let { addTabView, addBreadCrumbs, setOpenKeys, location} = props; // 这他妈是解构出来的actions
        let pathname = location.pathname;   //   权限管理：/auth     react动画->滑动：/animate/slide
        let router = filterRoutes(pathname); 
        // for (const item of router) { console.log(item) }
        // console.log("=================================")

        // 添加 tabViews
        addTabView({ pathname })

        // 面包屑 （将上面处理后的router作为面包屑）
        addBreadCrumbs(router)

        // 设置 slideBar （将上面处理后的router作为展开的MenuProps）
        // console.log(router.filter(route => route.children).map(route => route.path))
        setOpenKeys(router.filter(route => route.children).map(route => route.path))
    }

    // 获取用户信息 （重新设置用户信息）
    async getUserInfo (cb){
        try {
            const { getUser } = this.props;
            // console.log(getUser)
            await getUser(Cookie.get('Auth_Token'))
            // 这里是将获取Cookie中的Token传递过去，重新设置User信息 
            cb && cb();
        }catch(e) { message.error(e) }
    }

    /** #### 每个路由的权限判断  */ 
    hasPermission(roles, route) {
        if (route.role) {
            return roles.some(role => route.role.indexOf(role) >= 0)
        } else {
            return true
        }
    }
    /** #### 根据角色role处理路由route  */
    filterAsyncRouter (routes, roles) {
        let accessedRouters = routes.filter(route => {
            if (hasPermission(roles, route)) {
                if (route.children && route.children.length) {
                    route.children = filterAsyncRouter(route.children, roles)
                }
                return true
            }
            return false
        })
        return accessedRouters;
    }
    /** #### TODO: 根据role设置Menu （不同角色看到不同菜单Menu）  */
    setRoutesByRole (roles) {
        let {routes, setRoutes} = this.props;
        let accessedRouters = []
        if (roles.indexOf('admin') >= 0) {
            accessedRouters = asyncRouterMap
        }else {
            accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        // console.log('侧边栏Routes：', accessedRouters)
        setRoutes(accessedRouters)
    }






    //------------------------> render 
    render () {
        let { location: { pathname }, user } = this.props;

        const isExistPath = (routes, pathname) => {
            return routes.some(route => { 
                if (route.path === pathname) return true
                if (route.children) return isExistPath(route.children, pathname)
                return false
            })
        }
        /** #### 一、routes 是否存在 pathname  */ 
        if (!isExistPath(allRoutes, pathname)) return <Redirect to='/error/404'/>;
        


        const getRoute = (routes, pathname) => {
            let fn = routes => routes.map(route => {
                if (route.path === pathname && !route.redirect) return route;
                if (route.children) return fn(route.children).find(v => v);
                return false
            })
            return fn(routes).find(route => route)
        }
        const getRouteName = (routes, pathname) => getRoute(routes, pathname).name

        /** #### 二、根据pathname获取当前route （当前路径路由信息）  */
        let currRoute = getRoute(allRoutes, pathname)
        console.log(currRoute)


        /** #### 三、非白名单验证 - 存在的路由下  */
        if (!whiteList.some(path => path === pathname)) { // whiteList = ['/login', '/error/404', '/error/401']
            // 登录验证 （获取不到本地的Cookie：重定向）
            if (!Cookie.get('Auth_Token')) { return <Redirect to={{ pathname: '/login' }} /> }
            
            // 获取用户信息
            if (!user) {
                this.getUserInfo(() => {
                    this.setRoutesByRole(this.props.user.roles);
                })
            }
        }



        /** #### 四、根据role判断 是否有权限进入某页面 （根据网址也不行）  */
        if (user && currRoute) { 
            const isAuth = (role, user) => { 
                if (!role || (user && user.roles.indexOf('admin') >= 0)) return true;
                if (!user) return false; 
                // 当登陆用户editor时，访问http://localhost:3034/#/auth 就会不存在
                return role.some( r => user.roles.indexOf(r) >= 0); 
            } 
            if (!isAuth(currRoute.role, user)) return <Redirect to='/error/401'/>
        }
        


        
        const isRedirectPath = (routes, pathname) => {
            return routes.find(route => {
                return route.path === pathname && route.redirect && route.redirect !== route.path
            })
        }
        /** #### 五、重定向子路径  */
        let route = isRedirectPath(allRoutes, pathname)
        if (route) return <Redirect to={route.redirect} />
        

        document.title = currRoute.name;


        
        // 路由渲染
        const RouteComponent = route => <Route key={route.path} exact={route.exact || false} path={route.path} component={route.component} /> 

        // 路由表渲染 
        const renderRouteComponent = routes => {
            return routes.map((route, index) => {
                return route.children ? route.children.map(route => RouteComponent(route)) : RouteComponent(route)
            })
        }

        // 带有layout的路由
        const ComponentByLayout = ({ history }) => (
            <Layout history={history}>
                <Switch>
                    {renderRouteComponent(allRoutes.filter(route => route.layout))}
                </Switch>
            </Layout>
        )

        //------------------------> return 
        return (
            <Switch>
                {renderRouteComponent(allRoutes.filter(route => !route.layout))}
                <Route path="/" component={ComponentByLayout}/>
            </Switch>
        )
    }
}


export default connect(state => ({user: state.user,routes: state.routes}), dispatch => bindActionCreators(actions, dispatch))(MainComponents)
import {   HomeOutlined,    PieChartOutlined,    AreaChartOutlined,    SafetyOutlined,    AppstoreOutlined,    LineChartOutlined,
    BarsOutlined,    ToolOutlined,    UserOutlined,    BarChartOutlined  } from "@ant-design/icons";

/**
 * 路由列表
 * @type {[{icon: JSX.Element, title: string, key: string}, {children: [{icon: JSX.Element, title: string, key: string}, {icon: JSX.Element, title: string, key: string}], icon: JSX.Element, title: string, key: string}, {icon: JSX.Element, title: string, key: string}, {icon: JSX.Element, title: string, key: string}, {children: [{icon: string, title: string, key: string}, {icon: JSX.Element, title: string, key: string}, {icon: JSX.Element, title: string, key: string}], icon: JSX.Element, title: string, key: string}]}
 */
const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: "/home",// 对应的 path
        icon: <HomeOutlined/>, // 图标名称
        isPublic: true  //所有用户都可以访问这个页面，针对权限
    }, {
        title: '商品',
        key: '/products',
        icon: <AppstoreOutlined/>,
        children: [
            // 子菜单列表
            {
                title: '品类管理',
                key: '/category',
                icon: <BarsOutlined/>
            },
            {
                title: '商品管理',
                key: '/product',
                icon: <ToolOutlined/>
            }
        ]
    }, {
        title: '用户管理',
        key: '/user',
        icon: <UserOutlined/>
    }, {
        title: '角色管理',
        key: '/role',
        icon: <SafetyOutlined/>
    }, {
        title: '图形图表',
        key: '/charts',
        icon: <AreaChartOutlined/>,
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: <BarChartOutlined />
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: <LineChartOutlined/>
            }, {
                title: '饼图',
                key: '/charts/pie',
                icon: <PieChartOutlined/>
            },
        ]
    }]
export default menuList
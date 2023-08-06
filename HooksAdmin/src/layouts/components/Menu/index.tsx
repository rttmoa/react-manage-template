/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin } from "antd";
import { findAllBreadcrumb, getOpenKeys, handleRouter, searchRoute } from "@/utils/util";
import { setMenuList } from "@/redux/modules/menu/action";
import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { setAuthRouter } from "@/redux/modules/auth/action";
import { getMenuList } from "@/api/modules/login";
import { connect } from "react-redux";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import Logo from "./components/Logo";
import "./index.less";








const LayoutMenu = (props: any) => {
	const { pathname } = useLocation(); 
	const { isCollapse, setBreadcrumbList, setAuthRouter, setMenuList: setMenuListAction } = props;

	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);		// 当前选中的菜单项 key 数组 - string[]
	const [openKeys, setOpenKeys] = useState<string[]>([]);										// 当前展开的 SubMenu 菜单项 key 数组 - string[]

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
		isCollapse ? null : setOpenKeys(getOpenKeys(pathname)); // 是否折叠
	}, [pathname, isCollapse]);

	// 设置当前展开的 subMenu
	const onOpenChange = (openKeys: string[]) => {
		// console.log(openKeys) // NOTE: 主Menu：   1、[]  ||  2、['/menu']  ||  3、['/menu', '/dashboard']
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};

	// 定义 menu 类型
	type MenuItem = Required<MenuProps>["items"][number];
	const getItem = (
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
	): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type
		} as MenuItem;
	};

	// 动态渲染 Icon 图标
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {  // 只传递一个List，第二个参数默认为List，仅供处理后返回用
		menuList.forEach((item: Menu.MenuOptions) => {
			// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		});
		// console.log("初始：", menuList)
		// console.log("结果：", newArr)
		return newArr;
	};

	// TODO: 获取菜单列表并处理成 antd menu 需要的格式,  // NOTE: 多处使用递归
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(false);
	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data } = await getMenuList();
			if (!data) return;
			// console.log('meun', data);
			// NOTE: 将接口的数据处理成Antd要的数据
			// console.log("初始：", data)
			// console.log("结果：", deepLoopFloat(data))
			setMenuList(deepLoopFloat(data));

			// 存储处理过后的所有面包屑导航栏到 redux 中
			setBreadcrumbList(findAllBreadcrumb(data));

			// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
			const dynamicRouter = handleRouter(data);
			// console.log("处理后的路由菜单", dynamicRouter)
			setAuthRouter(dynamicRouter);

			setMenuListAction(data);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getMenuData();
	}, []);

	// 点击当前菜单跳转页面
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		// console.log("点击的Menu", key)
		// console.log("待递归数组", props.menuList) // NOTE: 10个Menu：(10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
		const route = searchRoute(key, props.menuList);
		// console.log(route) // {icon: 'AppstoreOutlined', path: '/link/gitee', title: 'Gitee 仓库', isLink: 'https://gitee.com/laramie/Hooks-Admin'}
		if (route.isLink) window.open(route.isLink, "_blank"); // NOTE: 在这里如果Obj中有isLink属性，直接跳转到新空白页
		navigate(key);
	};

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo></Logo>
				<Menu
					theme="dark"
					mode="inline"									// 菜单类型，现在支持垂直、水平、和内嵌模式三种 - vertical | horizontal | inline
					triggerSubMenuAction="click"	// SubMenu 展开/关闭的触发行为 - hover | click
					openKeys={openKeys}						// 当前展开的 SubMenu 菜单项 key 数组 - string[]
					selectedKeys={selectedKeys}		// 当前选中的菜单项 key 数组 - string[]
					items={menuList}							// 菜单内容 - ItemType[]
					onClick={clickMenu}						// 点击 MenuItem 调用此函数 - function({ item, key, keyPath, domEvent })
					onOpenChange={onOpenChange}		// SubMenu 展开/关闭的回调 - function(openKeys: string[])	
				></Menu>
			</Spin>
		</div>
	);
};
const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);

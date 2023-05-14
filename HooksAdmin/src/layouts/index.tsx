/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { setAuthButtons } from "@/redux/modules/auth/action";
import { updateCollapse } from "@/redux/modules/menu/action";
import { getAuthorButtons } from "@/api/modules/login";
import { connect } from "react-redux";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs";
import LayoutFooter from "./components/Footer";
import "./index.less";
const { Sider, Content } = Layout;  // 这个Sider、Content永远不会变







const LayoutIndex = (props: any) => {
	const { isCollapse, updateCollapse, setAuthButtons } = props;
	// console.log("侧边栏是否折叠", isCollapse)

	// 获取按钮权限列表
	const getAuthButtonsList = async () => {
		const { data } = await getAuthorButtons();
		// console.log(data) // {useHooks: {useHooks: {add: true, delete: true}}}
		setAuthButtons(data);
	};
	
	// NOTE: 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 1200) updateCollapse(true);
				if (!isCollapse && screenWidth > 1200) updateCollapse(false);
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
		getAuthButtonsList();
	}, []);




	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
		<section className="container">
			
			{/* 左侧侧边栏 */}
			<Sider trigger={null} collapsed={props.isCollapse} width={220} theme="dark">
				<LayoutMenu></LayoutMenu>
			</Sider>

			{/* 头部 + Tabs + 内容区域 + 脚部 */}
			<Layout>
				<LayoutHeader></LayoutHeader>

				<LayoutTabs></LayoutTabs>

				<Content>
					<Outlet></Outlet>
				</Content>

				<LayoutFooter></LayoutFooter>
				
			</Layout>

		</section>
	);
}; 
export default connect((state: any) => state.menu,  { setAuthButtons, updateCollapse })(LayoutIndex);

/* eslint-disable prettier/prettier */
import { Layout } from "antd";
import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import AssemblySize from "./components/AssemblySize";
import Language from "./components/Language";
import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import "./index.less";







const LayoutHeader = () => {
	const { Header } = Layout;

	return (
		<Header>

			<div className="header-lf">
				{/* 是否折叠图标 */}
				<CollapseIcon />
				{/* 面包屑 */}
				<BreadcrumbNav />
			</div>

			<div className="header-ri">
				{/* 切换组件大小：全局 */}
				<AssemblySize />
				{/* 切换语言：全局 */}
				<Language />
				{/* 切换主题：全局 */}
				<Theme />
				{/* 切换全屏 */}
				<Fullscreen />
				<span className="username">System</span>
				{/* 头像 */}
				<AvatarIcon />
			</div>

		</Header>
	);
};

export default LayoutHeader;

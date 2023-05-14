/* eslint-disable prettier/prettier */
import { Drawer, Divider, Switch } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { FireOutlined, SettingOutlined } from "@ant-design/icons";
import { setThemeConfig } from "@/redux/modules/global/action";
import { updateCollapse } from "@/redux/modules/menu/action";
import SwitchDark from "@/components/SwitchDark";





const Theme = (props: any) => {
	const [visible, setVisible] = useState<boolean>(false);
	const { setThemeConfig, updateCollapse } = props; // 设置主题配置 + 更新是否被折叠
	const { isCollapse } = props.menu;		// 折叠菜单：是否被折叠
	const { themeConfig } = props.global;	// 全局主题设置
	const { weakOrGray, breadcrumb, tabs, footer } = themeConfig;
	// console.log("全局配置：", props.global.themeConfig);


	// 设置灰阶模式 / 色弱模式
	const setWeakOrGray = (checked: boolean, theme: string) => {
		if (checked) return setThemeConfig({ ...themeConfig, weakOrGray: theme });
		setThemeConfig({ ...themeConfig, weakOrGray: "" });
	};

	// 主题：面包屑 Tabs 底部 是否显示
	const onChange = (checked: boolean, keyName: string) => { // true/false     "breadcrumb"/'tabs'/'footer'
		// console.log(checked, keyName)
		return setThemeConfig({ ...themeConfig, [keyName]: !checked });
	};

	const drawerOptions = {
		title: "布局设置",
		closable:false,
		onClose() {
			setVisible(false)
		},
		visible: visible,
		width: 320
	}


	return (
		// Switch组件：https://4x.ant.design/components/switch-cn/#API
		<>
			<i className="icon-style iconfont icon-zhuti" onClick={() => { setVisible(true) }}></i>
			<Drawer {...drawerOptions}>
				{/* 全局主题 */}
				<Divider className="divider"><FireOutlined />全局主题</Divider>
				<div className="theme-item">
					<span>暗黑模式</span>
					<SwitchDark />
				</div>
				<div className="theme-item">
					<span>灰色模式</span>
					<Switch checked={weakOrGray === "gray"} onChange={e => {setWeakOrGray(e, "gray");}}/>
				</div>
				<div className="theme-item">
					<span>色弱模式</span>
					<Switch checked={weakOrGray === "weak"} onChange={e => {setWeakOrGray(e, "weak");}}/> 
				</div>
				<br />

				{/* 界面设置 */}
				<Divider className="divider"><SettingOutlined />界面设置</Divider>
				<div className="theme-item">
					<span>折叠菜单</span>
					<Switch checked={isCollapse} onChange={e => {updateCollapse(e);}}/>
				</div>
				<div className="theme-item">
					<span>面包屑导航</span>
					<Switch checked={!breadcrumb} onChange={e => {onChange(e, "breadcrumb");}}/>
				</div>
				<div className="theme-item">
					<span>标签栏</span>
					<Switch checked={!tabs} onChange={e => {onChange(e, "tabs");}}/> 
				</div>
				<div className="theme-item">
					<span>页脚</span>
					<Switch checked={!footer} onChange={e => {onChange(e, "footer");}}/> 
				</div>
			</Drawer>
		</>
	);
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setThemeConfig, updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(Theme);

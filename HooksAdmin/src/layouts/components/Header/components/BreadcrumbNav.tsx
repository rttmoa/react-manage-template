/* eslint-disable prettier/prettier */
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";




const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();
	const { themeConfig } = props.global;
	const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || [];
	// console.log(props);
	// console.log(props.breadcrumb.breadcrumbList[pathname]) // ['Dashboard', '数据可视化']

	return (
		<>
		{/* 界面设置：Switch面包屑导航是否显示 */}
			{!themeConfig.breadcrumb && (
				<Breadcrumb>
					<Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>
					{breadcrumbList.map((item: string) => {
						return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
					})}
				</Breadcrumb>
			)}
		</>
	);
}; 
export default connect((state: any) => state,  null)(BreadcrumbNav);

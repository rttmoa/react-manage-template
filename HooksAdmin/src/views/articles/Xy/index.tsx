import "./index.less";
import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Divider, Typography, Tag, BackTop, Radio, Space } from "antd";

import CodeBlock from "../utils/CodeBlock"; // 格式化代码Markdown
import Gallery from "../utils/gallery"; // 渲染图片Images
import { 
	axios, 	BaseForm,	Table,	NavLink, 	Utils,	MenuConfig,	LessCommon,
	LessDeafult,	LessLoading,	CarDetail,	CityDetail,	CarMap,
	Register,	RichText,	IndexRouter,	IndexApp,	IndexAdmin,	IndexCommon, 
} from "./code/index"; // 要被渲染的代码Code



const List: React.FC = () => {
	const { Title, Paragraph, Text } = Typography;
	const [radioValue, setRadioValue] = useState<number>(1); // 单选框的值

	// 引入组件 + 修改属性 + 修改单选框
	const objProps = {
		1: axios,
		2: BaseForm, 
		3: Table, 
		4: NavLink, 	
		5: Utils,	
		6: MenuConfig,	
		7: LessCommon,
		8: LessDeafult,	
		9: LessLoading,	
		10: CarDetail,	
		11: CityDetail,	
		12: CarMap,
		13: Register,	
		14: RichText,	
		15: IndexRouter,	
		16: IndexApp,	
		17: IndexAdmin,	
		18: IndexCommon,
	};

	return (
		<div className="app">
			<div className="card">

				{/* 标题及标签部分 */}
				<Title level={2}>Start</Title>
				<Paragraph>
					<Tag color="red" className="tag">Class</Tag>
					<Tag color="cyan" className="tag">antd3</Tag>
					<Tag color="cyan" className="tag">redux3</Tag>
					<Tag color="cyan" className="tag">react-router-dom4</Tag>
					<Tag color="cyan" className="tag">less2</Tag>
					<Tag color="cyan" className="tag">webpack3</Tag>
					<Tag color="cyan" className="tag">echarts</Tag>
					<Tag color="cyan" className="tag">echarts-for-react</Tag>
					<Tag color="cyan" className="tag">draftjs-to-html</Tag>
				</Paragraph>


				{/* ---------- TODO: 每一个描述内容的盒子 ----------------------------------- */}
				<div className="content">
					<Title level={3}>项目介绍</Title>
					<Divider orientation="left">技术</Divider>
					<Paragraph>
						<blockquote>
							<Title level={5}>React + Nodejs</Title>
						</blockquote>
						<blockquote>
							<Title level={5}>Module：js-cookie、i18next、react-i18next、pubsub-js</Title>
						</blockquote> 
					</Paragraph>
					<Divider orientation="left">项目功能</Divider>
					<Paragraph>
						<blockquote>
							<Title level={5}>商品：品类管理 （一级分类、二级分类）</Title> 
						</blockquote>
						<blockquote>
							<Title level={5}>商品：商品管理 （商品，消费品的增删改查）</Title>
						</blockquote> 
						<blockquote>
							<Title level={5}>用户管理：用户的增删改查</Title>
						</blockquote> 
						<blockquote>
							<Title level={5}>角色管理/权限管理：某些角色可查看系统的某些内容</Title>
						</blockquote> 
						<blockquote>
							<Title level={5}>图标：柱状图、折线图、饼图</Title>
						</blockquote> 
					</Paragraph>
					<Divider orientation="left">Others</Divider>
					<Paragraph>
						<ul>
							<li>
								<Paragraph>
									<Text strong>Others</Text>
									<Paragraph>下面为一些图片及代码描述</Paragraph>
								</Paragraph>
							</li>
						</ul>
					</Paragraph>
				</div>


				{/* ---------- TODO: 图片画廊 ----------------------------------- */}
				<div className="content">
					<Title level={3}>图片画廊</Title>
					<Divider orientation="left">功能业务</Divider>
					<Gallery url={"/src/resource/Xy/"}></Gallery>
				</div>


				{/* ---------- TODO: 展示代码 ----------------------------------- */}
				<div className="content">
					<Title level={3}>展示代码</Title>
					<Divider orientation="left">功能</Divider>
					<div style={{ display: "flex" }}>
						<div style={{ width: 350 }}>
							<Radio.Group value={radioValue} onChange={(e: RadioChangeEvent) => {setRadioValue(e.target.value)}}>
								<Space direction="vertical">
									<Radio value={1}>封装axios</Radio>
									<hr />
									<Radio value={2}>封装Component-封装查询条件</Radio>
									<Radio value={3}>封装Component-{"<Tabel />组件"}</Radio>
									<Radio value={4}>封装Component-侧边栏</Radio>
									<hr />
									<Radio value={5}>封装工具类-ultis</Radio> 
									<Radio value={6}>封装菜单配置-MenuConfig</Radio> 
									<Radio value={7}>封装Less-Common</Radio>
									<Radio value={8}>封装Less-default</Radio>
									<Radio value={9}>封装Less-loading</Radio>
									<hr />
									<Radio value={10}>功能-车辆详情</Radio>
									<Radio value={11}>功能-城市详情</Radio>
									<Radio value={12}>功能-渲染车辆地图信息</Radio>
									<Radio value={13}>功能-封装注册表单-register</Radio>
									<Radio value={14}>功能-封装富文本编辑器-richText</Radio>
									<hr />
									<Radio value={15}>根Index-router</Radio>
									<Radio value={16}>根Index-App</Radio>
									<Radio value={17}>根Index-admin</Radio>
									<Radio value={18}>根Index-common</Radio> 
								</Space>
							</Radio.Group>
						</div>
						<div style={{width: '100%'}}>
							<CodeBlock language="javascript" code={objProps[radioValue]}></CodeBlock> 
						</div>
					</div>
				</div>
  
			</div>
		</div>
	);
};

export default List;

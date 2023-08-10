import "./index.less";
import CodeBlock from "../utils/CodeBlock";
import type { RadioChangeEvent } from 'antd';
import { Divider, Typography, Tag, BackTop,  Radio, Space } from 'antd';
import Gallery from "../utils/gallery";
import { useState } from "react";
// import BackTopCom from "../utils/BackTop";
const { Title, Paragraph, Text, Link } = Typography;


// 参考：https://dzblog.cn/article/60dc33e718dbe9391712042a
const List = () => {

	const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
	
	const code = `import React from 'react';
import CodeBlock from '@/components/CodeBlock';

export default function BlogPost() {
	const code = '111'; 
	return (
		<div>
			<CodeBlock language="javascript" code={code} />
		</div>
	);
}`; 
const moreCode = `<div className="card"> 
{/* 标题及标签部分 */}
<Title level={2}>Start</Title>
<Paragraph>
	<Tag color="cyan" className="tag">typescript</Tag>
</Paragraph>

{/* 每一个描述内容的盒子 */}
<div className="content">
	<Title level={3}>项目介绍</Title>
	<Divider orientation="left">项目功能</Divider>
	<Paragraph>
		<blockquote><Title level={5}>封装request请求响应，类组件中class Axios{"{}"}封装axios返回new Promise()、控制loading加载状态，block/none </Title></blockquote>
		<blockquote><Title level={5}>封装utils工具类，供组件去使用：比如格式化时间、格式化金额、格式化公里数</Title></blockquote>
		<blockquote><Title level={5}>封装Style，定义一些全局变量：{"common、default、loading.less"}</Title></blockquote>
		<blockquote><Title level={5}>绘制车辆地图</Title></blockquote>
		<blockquote><Title level={5}>渲染百度地图</Title></blockquote>
		<blockquote><Title level={5}>基础组件，富文本，Echarts</Title></blockquote>
		<blockquote><Title level={5}>项目中主要使用Form组件的使用（获取表单值+处理表单）</Title></blockquote>
		<blockquote><Title level={5}>组件中演示了图片画廊</Title></blockquote>
		<blockquote>
			<Title level={5}>侧边栏：</Title>
			<Text type="secondary">UI、表单、表格、富文本、城市管理、订单管理、员工管理、车辆管理、Echarts、权限管理</Text>
		</blockquote>
	</Paragraph>
	<Divider orientation="left">Others</Divider>
	<Paragraph>
		<ul>
			<li>
				<Paragraph>
					<Text strong>Others</Text>
					<Paragraph>
						下面为一些图片及代码描述 
					</Paragraph>
				</Paragraph> 
			</li> 
		</ul>
	</Paragraph>  
</div>

{/* TODO: 展示代码 */}
<div className="content" >
	<Title level={3}>展示代码</Title>
	<Divider orientation="left">功能</Divider> 
	<div style={{display: 'flex'}}>
		<div style={{width: 200}}>
			<Radio.Group onChange={onChange} value={value}>
				<Space direction="vertical">
					<Radio value={1}>左侧侧宾蓝的大大的第三方</Radio>
					<Radio value={2}>Option B</Radio>
					<Radio value={3}>Option C</Radio> 
				</Space>
			</Radio.Group>
		</div>
		<div style={{flex: 1}}> <CodeBlock  language="javascript" code={code} /> </div>
	</div> 
</div>

{/* TODO: 图片画廊 */}
<div className="content">
	<Title level={3}>图片画廊</Title>
	<Divider orientation="left">功能</Divider> 
	<Gallery></Gallery>
</div>

{/* TODO: 测试Antd组件 */}
<div className="content">
	<Title level={3}>介绍</Title>
	<Divider orientation="left">功能</Divider>
	<Paragraph>
		蚂蚁的企业级产品是一个庞大且复杂的体系。
		我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和 <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
		<Text type="secondary">Ant Design (secondary)</Text>
		<Text type="success">Ant Design (success)</Text>
		<Text type="warning">Ant Design (warning)</Text>
		<Text type="danger">Ant Design (danger)</Text>
	</Paragraph>
	<Paragraph>
		随着商业化的趋势， 
	</Paragraph> 

	<Paragraph>
		<ul>
			<li>
				<Paragraph>
					<Text strong>更好的用户体验</Text>
					<Paragraph>
						蚂蚁的企业级产品是一 
					</Paragraph>
				</Paragraph>
				
			</li>
			<li>
				<Paragraph>
					<Text strong>更好的用户体验</Text>
					<Paragraph>
						蚂蚁的企业级产品是一个 
					</Paragraph>
				</Paragraph>
				
			</li>
		</ul>
	</Paragraph> 

	<Divider orientation="left">Code</Divider>
	<CodeBlock  language="javascript" code={code} /> 
</div> 
</div>`
	return (
		<div className="app">
			<div className="card"> 
				{/* 标题及标签部分 */}
				<Title level={2}>Start</Title>
				<Paragraph>
					<Tag color="cyan" className="tag">typescript</Tag>
				</Paragraph>

				{/* 每一个描述内容的盒子 */}
				<div className="content">
					<Title level={3}>项目介绍</Title>
					<Divider orientation="left">项目功能</Divider>
					<Paragraph>
						<blockquote><Title level={5}>封装request请求响应，类组件中class Axios{"{}"}封装axios返回new Promise()、控制loading加载状态，block/none </Title></blockquote>
						<blockquote><Title level={5}>封装utils工具类，供组件去使用：比如格式化时间、格式化金额、格式化公里数</Title></blockquote>
						<blockquote><Title level={5}>封装Style，定义一些全局变量：{"common、default、loading.less"}</Title></blockquote>
						<blockquote><Title level={5}>绘制车辆地图</Title></blockquote>
						<blockquote><Title level={5}>渲染百度地图</Title></blockquote>
						<blockquote><Title level={5}>基础组件，富文本，Echarts</Title></blockquote>
						<blockquote><Title level={5}>项目中主要使用Form组件的使用（获取表单值+处理表单）</Title></blockquote>
						<blockquote><Title level={5}>组件中演示了图片画廊</Title></blockquote>
						<blockquote>
							<Title level={5}>侧边栏：</Title>
							<Text type="secondary">UI、表单、表格、富文本、城市管理、订单管理、员工管理、车辆管理、Echarts、权限管理</Text>
						</blockquote>
					</Paragraph>
					<Divider orientation="left">Others</Divider>
					<Paragraph>
						<ul>
							<li>
								<Paragraph>
									<Text strong>Others</Text>
									<Paragraph>
										下面为一些图片及代码描述 
									</Paragraph>
								</Paragraph> 
							</li> 
						</ul>
					</Paragraph>  
				</div>

				{/* TODO: 展示代码 */}
				<div className="content" >
					<Title level={3}>展示代码</Title>
					<Divider orientation="left">功能</Divider> 
					<div style={{display: 'flex'}}>
						<div style={{width: 200}}>
							<Radio.Group onChange={onChange} value={value}>
								<Space direction="vertical">
									<Radio value={1}>左侧侧宾蓝的大大的第三方</Radio>
									<Radio value={2}>Option B</Radio>
									<Radio value={3}>Option C</Radio> 
								</Space>
							</Radio.Group>
						</div>
						<div style={{flex: 1}}> <CodeBlock  language="javascript" code={moreCode} /> </div>
					</div> 
				</div>

				{/* TODO: 图片画廊 */}
				<div className="content">
					<Title level={3}>图片画廊</Title>
					<Divider orientation="left">功能</Divider> 
					<Gallery></Gallery>
				</div>

				{/* TODO: 测试Antd组件 */}
				<div className="content">
					<Title level={3}>介绍</Title>
					<Divider orientation="left">功能</Divider>
					<Paragraph>
						蚂蚁的企业级产品是一个庞大且复杂的体系。
						我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和 <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
						<Text type="secondary">Ant Design (secondary)</Text>
						<Text type="success">Ant Design (success)</Text>
						<Text type="warning">Ant Design (warning)</Text>
						<Text type="danger">Ant Design (danger)</Text>
					</Paragraph>
					<Paragraph>
						随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
						Ant Design。基于<Text mark>『确定』和『自然』</Text>
						的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
						<Text strong>更好的用户体验</Text>。
					</Paragraph> 

					<Paragraph>
						<ul>
							<li>
								<Paragraph>
									<Text strong>更好的用户体验</Text>
									<Paragraph>
										蚂蚁的企业级产品是一个庞大且复杂的体系。
										我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和 <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
									</Paragraph>
								</Paragraph>
								
							</li>
							<li>
								<Paragraph>
									<Text strong>更好的用户体验</Text>
									<Paragraph>
										蚂蚁的企业级产品是一个庞大且复杂的体系。
										我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和 <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
									</Paragraph>
								</Paragraph>
								
							</li>
						</ul>
					</Paragraph> 

					<Divider orientation="left">Code</Divider>
					<CodeBlock  language="javascript" code={code} /> 
				</div> 
			</div>
		</div>
	);
};

export default List;

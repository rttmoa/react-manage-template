import React from 'react'
import Panel from './Panel'
import Todo from './Todo'
import Info from './Info'
import Steps from './Steps'
import {Row, Col, Card} from 'antd'
import './index.less'



/**--- 
 * 使用 Row，Col组件时 当屏幕缩小时 可以自适应屏幕！
 *  ---**/
export default () => (
	<div className="home_wrapper">
		{/* 人数、收藏、邮件、图片 - 卡片组件 */}
		<Panel />
		<Row className="home_body">
			<Col md={9} className="gutter-row">
				<Card bordered={false}>
					{/* 时间线组件 */}
					<Steps />
				</Card>
			</Col>
			<Col md={9} className="gutter-row">
				<Card bordered={false}>
					
					<Todo />
				</Card>
			</Col>
			<Col md={6} className="gutter-row">
				<Card bordered={false}>
					<Info />
				</Card>
			</Col>
		</Row>
	</div>
)
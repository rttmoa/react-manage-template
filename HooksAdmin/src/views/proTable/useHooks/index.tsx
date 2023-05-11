/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { Table, DatePicker, Button, Space } from "antd";
import useAuthButtons from "@/hooks/useAuthButtons";

import "./index.less";

const UseHooks = () => {
	// TODO: 按钮权限
	const { BUTTONS } = useAuthButtons();
	const { RangePicker } = DatePicker;

	useEffect(() => {
		console.log("按钮权限BUTTONS", BUTTONS);
	}, []);

	const dataSource = [
		{
			key: "1",
			name: "胡彦斌",
			age: 32,
			address: "西湖区湖底公园1号"
		},
		{
			key: "2",
			name: "胡彦祖",
			age: 42,
			address: "西湖区湖底公园1号"
		},
		{
			key: "3",
			name: "刘彦祖",
			age: 18,
			address: "西湖区湖底公园1号"
		},
		{
			key: "4",
			name: "刘彦祖",
			age: 18,
			address: "翻斗大街翻斗花园二号楼1001室"
		},
		{
			key: "5",
			name: "刘彦祖",
			age: 18,
			address: "翻斗大街翻斗花园二号楼1001室"
		}
	];

	const columns: any[] = [
		{
			title: "姓名",
			dataIndex: "name",
			key: "name",
			align: "center"
		},
		{
			title: "年龄",
			dataIndex: "age",
			key: "age",
			align: "center"
		},
		{
			title: "住址",
			dataIndex: "address",
			key: "address",
			align: "center",
			width: "50%"
		}
	];
	return (
		<div className="card content-box">
			<h2 style={{fontSize: 20}}>TODO: {"{权限按钮}"}：BUTTONS.add / delete / edit  封装自定义组件useAuthButtons()  递归方式处理 searchRoute(pathname, routerArray)  </h2>
			<br />

			<div className="date">
				<span>切换国际化的时候看我 😎 ：</span>
				<RangePicker />
			</div>

			{/* {add: true, delete: true} */}
			<div className="auth">
				<Space>
					{BUTTONS.add && <Button type="primary">我是 Admin && User 能看到的按钮</Button>}
					{BUTTONS.delete && <Button type="primary">我是 Admin 能看到的按钮</Button>}
					{BUTTONS.edit && <Button type="primary">我是 User 能看到的按钮</Button>}
				</Space>
			</div>

			<Table bordered={true} dataSource={dataSource} columns={columns} />

		</div>
	);
};

export default UseHooks;

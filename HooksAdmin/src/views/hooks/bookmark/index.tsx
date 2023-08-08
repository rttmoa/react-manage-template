import "./index.less"; 
import React from "react";
import { Tabs } from 'antd'; 

import Item from "./components"; // 第一个Tab



 


const Hooks1: React.FC = () => {  
	
	const onChange = (key: string) => {
		console.log(key);
	};
	return (
		<div className="App">
			<Tabs
				className="tab"
				defaultActiveKey="1"
				onChange={onChange}
				items={Item}
			/>
			<Tabs
				className="tab" 
				defaultActiveKey="1"
				onChange={onChange}
				items={Item}
			/> 
			<Tabs
				className="tab" 
				defaultActiveKey="1"
				onChange={onChange}
				items={Item}
			/> 
	 </div>
	)
}

export default Hooks1

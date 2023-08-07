import { Card } from 'antd';
import { WaterMark } from "./WaterMark"
import UseState from "./UseState"
import UseEffect from './UseEffect'
import UseMemo from './UseMemo'



const Intro = () => {
	return (
		<div> 
			<Card title="首页、介绍Hooks" bordered={false} style={{ width: 300 }}> 
			asd
			<br /><br /> 
    </Card>
		</div>
	)
}
const Item = [
	{ label: "Hooks", key: '1', children: <Intro /> },
	{ label: "UseState", key: '2', children: <UseState /> },
	{ label: "UseEffect", key: '3', children: <UseEffect /> }, 
	{ label: "UseMemo", key: '4', children: <UseMemo /> },
	{ label: "UseEffect", key: '3', children: <UseEffect /> }, 
	{ label: "UseState", key: '2', children: <UseState /> },
	{ label: "UseEffect", key: '3', children: <UseEffect /> }, 
	
]
export { 
	Item,
	WaterMark
}

import "./index.less";
import { observer } from "mobx-react";
import { useStore } from './store'
import { Card, Typography, Space  } from 'antd';
const { Title } = Typography;




// Github地址：	https://github.com/Stars-Chan/mobx-induction
// 本地文件：		/create-react-mobx
const Mobx = () => {
	const { cart, counter } = useStore()

	return ( 
		 <div className="site-card-border-less-wrapper app">
		 <Card title="React-Mobx" bordered style={{ width: 500 }}> 
			<Title level={5}>计数器案例</Title>
			<p></p>
      <p>count 值：<span style={{fontWeight: 'bold'}}>{counter.count}</span></p>
      <p>count *2：<span style={{fontWeight: 'bold'}}>{counter.double}</span></p>
      <p>cart：{cart.list}</p>
			<Space>
				<button onClick={counter.increment}>加1</button>
				<button onClick={counter.incrementAsync}>异步加1</button>
				<button onClick={counter.decrement}>减1</button>
				<button onClick={counter.reset}>重置</button>
			</Space> 
		 </Card>
	 </div>
	)
}
  
export default observer(Mobx)

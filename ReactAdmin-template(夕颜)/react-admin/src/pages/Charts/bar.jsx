import React, {Component} from 'react';
import {Button, Card} from "antd";
import ReactEcharts from 'echarts-for-react'



class Bar extends Component {
    state = {
        sales: [5, 20, 36, 10, 10, 20],
        stores: [15, 12, 6, 20, 15, 20]
    }
    update = () => {
        this.setState((state) => ({
            sales: state.sales.map(sale => sale + 1),
            stores: state.stores.map(store => store - 1)
        }))
    }
    getOption = () => {
        const {sales, stores} = this.state
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            // x轴数据
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            // 数据
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            }, {
                name: '库存',
                type: 'bar',    
                data: stores
            }]
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>
                <Card title='柱状图一'>
                    <ReactEcharts option={this.getOption()} style={{height: 400}}/>
                </Card>
            </div>
        );
    }
}

export default Bar;
import React from 'react'
import { Radio } from 'antd'
import { Page } from 'components'
import ReChartsComponent from './ReChartsComponent'
import styles from './index.less'
const RadioGroup = Radio.Group

const chartList = [
  {
    label: 'lineChart',
    value: 'lineChart',
  },
  {
    label: 'barChart',
    value: 'barChart',
  },
  {
    label: 'areaChart',
    value: 'areaChart',
  },
]

class Chart extends React.Component {
  constructor() {
    super()
    this.state = {
      type: '',
    }
    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this)
  }
  handleRadioGroupChange(e) {
    // console.log(e) // 事件对象
    this.setState({
      type: e.target.value,
    })
  }
  render() {
    return (
      <Page inner>
        {/* 三个单选框 */}
        <RadioGroup
          options={chartList}
          defaultValue="lineChart"
          onChange={this.handleRadioGroupChange}
        />
        {/* 渲染对应的哪个页面 */}
        <div className={styles.chart}>
          <ReChartsComponent type={this.state.type} />
        </div>
      </Page>
    )
  }
}

export default Chart

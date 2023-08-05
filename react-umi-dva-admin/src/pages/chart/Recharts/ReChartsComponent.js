import React from 'react'
import PropTypes from 'prop-types'




/***--- 面积 Chart ---**/
import AreaChartComponent from './AreaChartComponent'

/***--- 柱状 Chart ---**/
import BarChartComponent from './BarChartComponent'

/***--- 线 Chart ---**/
import LineChartComponent from './LineChartComponent'




const ReChartsComponent = ({ type }) => {
  if (type === 'areaChart') return <AreaChartComponent />
  if (type === 'barChart') return <BarChartComponent />
  return <LineChartComponent />
}
ReChartsComponent.propTypes = {
  type: PropTypes.string,
}
export default ReChartsComponent

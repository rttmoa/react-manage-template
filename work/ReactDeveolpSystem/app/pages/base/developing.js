import React, { Component } from 'react'
import { Progress } from 'antd'




// 声明组件  并对外输出
export default class developing extends Component {
   
  render() {
    return (
      <div className="developing">
        <Progress
          type="circle"
          percent={100}
          format={() => '即将上线，敬请期待...'}
          width={200}
          status="active"
        />
      </div>
    )
  }
}

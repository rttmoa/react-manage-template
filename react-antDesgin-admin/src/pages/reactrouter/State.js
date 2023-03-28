import React, { Component } from 'react'

export default class State extends Component {
  
    constructor(props){
        super(props)
    }


    // state 方式依然可以传递任意类型的数据，而且可以不以明文方式传输
    render() {

      console.log(this.props)
      // 获取state的值
      // const {id, name, age} = this.props.location.state

      return (
        <div>State:(this.props.location.state)接收</div>
      )
  }
}

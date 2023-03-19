import React, { Component } from 'react'

export default class Query extends Component {


    constructor(props){
        super(props)
    }



    // query 方式可以传递任意类型的值，但是页面的 URL 也是由 query 的值拼接的，URL 很长，
        // 那么有没有办法类似于表单 post 方式传递数据使得传递的数据不以明文传输呢？
    render() {
        // console.log(this.props)
        // 获取query数据
        // const {id, name, age} = this.props.location.query
        return (
            <div>Query:(this.props.location.query)接收</div>
        )
    }
}

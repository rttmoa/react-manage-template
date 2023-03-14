import React, {Component} from 'react';
import {connect} from 'react-redux'
import './index.less'

class Home extends Component {
    render() {
        // console.log(new Date()) // Mon Nov 07 2022 13:22:47 GMT+0800 (中国标准时间)
        // console.log(new Date(new Date())); // Mon Nov 07 2022 13:22:25 GMT+0800 (中国标准时间)
        // let time  =new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        // console.log(time)
        // console.log(this)
        return (
            <div className="box">
                <div className="title">
                    欢迎使用夕颜后台管理系统
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state
}
function mapDispatchToProps() {
      return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React from 'react'
import {Button, Icon} from 'antd'
import './index.less'






/**--- 宽高100%、层级100、固定位置 ---**/
export default ({history}) => (
    <div className="error_401_wrapper">
        {/* 大盒子有宽高、子盒子不会被挤下去 */}
        <div className="error_401_box cf">
            <div className="left fl">
                <h1>OOPS!</h1>
                <h2>你没有权限去该页面</h2>
                <Button type="primary" style={{display: 'block', margin: '20px 0'}} onClick={() => {history.goBack()}}>
                    <Icon type="left" />Go Back
                </Button>
                <Button type="primary" style={{display: 'block', margin: '20px 0'}} onClick={() => {history.push('/')}}>
                    <Icon type="home" />Go Home
                </Button>
            </div>
            <div className="right fr">
                <img src={require('./401.gif')} alt="Girl has dropped her ice cream." className="errGif"/>
            </div>
        </div>
    </div>
)

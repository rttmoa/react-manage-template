import React, {Component} from 'react';
import {Breadcrumb} from "antd";
import {withRouter} from 'react-router-dom'






class BreadcrumbNav extends Component {
    render() {
        
        //拆分路径为数组
        // console.log(this.props.location.pathname.trim().split('/'))
        const pathArr = this.props.location.pathname.trim().split("/");
        // console.log(pathArr)
        return (
            <Breadcrumb style={{margin: '24px 24px 0px 24px'}}>
                {
                    pathArr.map((arr, index) => {
                        // console.log(arr)
                        return (
                            <Breadcrumb.Item key={index}>{index < 0 ? '/' : ''}{arr}</Breadcrumb.Item>
                        )   
                    })
                }
            </Breadcrumb>
        );
    }
}

/***--- withRouter连接Router ---**/
export default withRouter(BreadcrumbNav);
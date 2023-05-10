import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import NavLink from '../NavLink/NavLink';
import {breadcrumb} from './index.css';
const BreadcrumbItem = Breadcrumb.Item;






export default class BreadcrumbList extends Component {
    render() {
        let {breadcrumbItems} = this.props;
        // console.log(breadcrumbItems) // [['/', '首页'], ['/orders', '订单']]

        return (
            <div className={breadcrumb}>
                <Breadcrumb>
                    {/* {breadcrumbItems.map(([target, linkText], ind) => {
                        console.log(target, linkText)
                    })} */}
                    {breadcrumbItems.map(([target, linkText], index)=> {
                        return (
                            <BreadcrumbItem key={index}>
                                <NavLink target={target} linkText={linkText}/>
                            </BreadcrumbItem>
                        );
                    })}
                </Breadcrumb>
            </div>
        );
    }

}

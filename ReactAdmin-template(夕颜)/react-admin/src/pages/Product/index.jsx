import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import ProductHome from "../../components/Product/home";
import ProductAddUpdate from "../../components/Product/add-update";
import ProductDetail from "../../components/Product/detail";



/***--- 商品 --> 商品管理 ---**/
class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product/addUpdate" component={ProductAddUpdate}></Route>
                <Route path="/product/detail" component={ProductDetail}></Route>
                <Route path="/product" component={ProductHome}></Route>
            </Switch>
        );
    }
}

export default Product;
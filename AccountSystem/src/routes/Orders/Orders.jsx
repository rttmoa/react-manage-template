import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import {routerRedux} from 'dva/router';
import SearchBar from "../../components/SearchBar/SearchBar";
import OrderSearchForm from "../../components/Orders/OrderSearchForm/OrderSearchForm";
import OrderList from "../../components/Orders/OrderList/OrderList";
import BreadcrumbList from "../../components/BreadcrumbList/BreadcrumbList";
import AddOrder from "../../components/Orders/AddOrder/AddOrder";
import ModifyOrder from "../../components/Orders/ModifyOrder/ModifyOrder";
import { redirect } from "../../utils/webSessionUtils";
import { orderClass, orderContainer, addOrderContainer, modifyOrderContainer } from "./index.css";








function genOrders({ dispatch, orders, children, history, location, route, routeParams, routes, systemUser }) {

    if (!orders) return null; // 必须返回某个值： caught Invariant Violation: Orders.render(): A valid React element (or null) must be returned.

    const {
        list,
        total,
        timeRange,
        customerId,
        orderNumber,
        loading,
        current,
        currentItem,
        editorVisible,
        editorType, // Table编辑类型： 是 编辑 / 详情
        breadcrumbItems, // 面包屑
        customers, // 客户
    } = orders;
    // console.log('Orderjsx - total', total)

    // Table表格Data
    const orderListProps = {
        current,
        total,
        dataSource: list,
        loading,
        // 分页
        onPageChange(page) {
            dispatch({
                type: "orders/query",
                payload: { timeRange, customerId, orderNumber, page },
            });
        },
        // 操作 ~ 编辑
        onModify(orderId) {
            dispatch({
                type: "orders/queryOrderById",
                payload: {
                    orderId: orderId,
                    editorType: "modify",
                },
            });
        },
        // 操作 ~ 详情
        onReadOnly(orderId) {
            dispatch({
                type: "orders/queryOrderById",
                payload: {
                    orderId: orderId,
                    editorType: "detail",
                },
            });
        },
        // 操作 ~ 删除
        onDel(orderId) {
            dispatch({
                type: "orders/del",
                payload: orderId,
            });
        },
    };
    const orderEditor = {
        item: editorType === "create" ? {} : currentItem,
        type: editorType,
        visible: editorVisible,
        onConfirm(data) {
            dispatch({
                type: `orders/${editorType}`,
                payload: data,
            });
        },
        onCancel() {
            dispatch({
                type: "orders/hideEditor",
            });
        },
    };

    const onSearch = (fieldValues) => {
        // 时间筛选 + 客户名称 + 订单编号
        // console.log(fieldValues) // {timeRange: Array(2), customerId: '6451ee572dfb792d50d77d80', orderNumber: 'MDC202305100016'}
        dispatch({
            type: "orders/query",
            payload: { ...fieldValues, page: 1 },
        });
    };

    const onAdd = () => {
        dispatch({
            type: "orders/getOrderNumber",
        });
    };







    // console.log("客户名称-下拉框", customers)
    return (
        <div className={orderClass}>

            <BreadcrumbList breadcrumbItems={breadcrumbItems} />

            {/* 添加 / 编辑 / 详情  编辑内容部分 */}
            {editorVisible ? (
                editorType === "create" ? (
                    <div className={addOrderContainer}>
                        <AddOrder />
                    </div>
                ) : (
                    <div className={modifyOrderContainer}>
                        {/* TODO:  AddOrderGrid 组件中的功能！！！！！！ */}
                        <ModifyOrder editorType={editorType} />
                    </div>
                )
            ) : (
                // 主页面：外壳部分
                <div className={orderContainer}>

                    {/* 搜索组件 */}
                    <SearchBar onAdd={onAdd}>
                        <OrderSearchForm onSearch={onSearch} customers={customers}/>
                    </SearchBar>

                    <h3>AddOrderGrid 组件中的功能！！！！！！</h3>

                    {/* Table表格 */}
                    <OrderList {...orderListProps} />

                </div>
            )}
        </div>
    );
}
class Orders extends Component {
    static PropTypes = {
        orders: PropTypes.object,
        systemUser: PropTypes.object,
    }
    componentWillMount() {
        let { isLogin } = this.props && this.props.systemUser;
        return !isLogin && redirect();
    }
    render() {
        let { isLogin } = this.props.systemUser;
        return isLogin && genOrders(this.props);
    }
}
export default connect(({orders, systemUser}) => ({ orders, systemUser }), null)(Orders)

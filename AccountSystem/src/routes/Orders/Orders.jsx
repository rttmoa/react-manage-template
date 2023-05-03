import React, {Component,PropTypes} from 'react';
import {connect} from 'dva';
import SearchBar from '../../components/SearchBar/SearchBar';
import OrderSearchForm from '../../components/Orders/OrderSearchForm/OrderSearchForm';
import OrderList from '../../components/Orders/OrderList/OrderList';
// import {routerRedux} from 'dva/router';
import BreadcrumbList from '../../components/BreadcrumbList/BreadcrumbList';
import AddOrder from '../../components/Orders/AddOrder/AddOrder';
import ModifyOrder from '../../components/Orders/ModifyOrder/ModifyOrder';
import {redirect} from '../../utils/webSessionUtils';
import {orderClass, orderContainer, addOrderContainer, modifyOrderContainer} from './index.css';





function genOrders({dispatch, orders, children, history, location, route, routeParams, routes, systemUser }){

    if(!orders) return null; // 必须返回某个值： caught Invariant Violation: Orders.render(): A valid React element (or null) must be returned.
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
        editorType,
        breadcrumbItems,
		customers
    } = orders;
    // console.log('Orderjsx - total', total)


    // Table表格Data
    const orderListProps = {
        current,
        total,
        dataSource: list,
        loading,
        // 分页
        onPageChange(page){
			dispatch({
				type:'orders/query',
				payload: {timeRange, customerId, orderNumber, page}
			});
        },
        // 操作 ~ 编辑
        onModify(orderId) {
            dispatch({
                type:'orders/queryOrderById',
                payload: {
                    orderId: orderId,
                    editorType: 'modify'
                }
            });
        },
        // 操作 ~ 详情
        onReadOnly(orderId){
            dispatch({
                type:'orders/queryOrderById',
                payload: {
                    orderId: orderId,
                    editorType: 'detail'
                }
            });
        },
        // 操作 ~ 删除
        onDel(orderId){
            dispatch({
                type:'orders/del',
                payload: orderId,
            });
        }
    };
    const orderEditor = {
        item: editorType==='create'? {}:currentItem,
        type: editorType,
        visible: editorVisible,
        onConfirm(data){
            dispatch({
                type: `orders/${editorType}`,
                payload: data,
            });
        },
        onCancel(){
            dispatch({
                type:'orders/hideEditor'
            });
        }
    };

    const onSearch = (fieldValues) => {
        dispatch({
        	type:'orders/query',
			payload: {...fieldValues, page: 1}
		});
    };

    const onAdd = () => {
        dispatch({
            type:'orders/getOrderNumber'
        });
    };

    return (
        <div className={orderClass}>
            <BreadcrumbList breadcrumbItems={breadcrumbItems} />
            {editorVisible ? (editorType === 'create' ? (
                    <div className={addOrderContainer}>
                        <AddOrder />
                    </div>
                ): (
                    <div className={modifyOrderContainer}>
                        <ModifyOrder editorType={editorType}/>
                    </div>
                )
            ): (<div className={orderContainer}>
                {/* TODO: 搜索组件 */}
                <SearchBar onAdd={onAdd}>
                    <OrderSearchForm onSearch={ } customers={customers}/>
                </SearchBar>
                {/* TODO: Table */}
                <OrderList {...orderListProps} />
            </div>)}
        </div>
    );
}

class Orders extends Component{
	componentWillMount(){
		let {isLogin} = this.props && this.props.systemUser;
		return !isLogin && redirect();
	}
    render(){
		let {isLogin} = this.props.systemUser;
		return isLogin && genOrders(this.props);
    }
}
Orders.propTypes = {
    orders:PropTypes.object,
    systemUser: PropTypes.object
};
function mapStateToProps({orders, systemUser}) {
    return {orders, systemUser};
}
export default connect(mapStateToProps)(Orders);

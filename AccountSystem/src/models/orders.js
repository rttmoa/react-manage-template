import {query, create, modify, del, getOrderNumber, queryOrderById} from '../services/orders';
import * as customers from '../services/customers';
import * as resource from '../services/resource';
import {parse} from 'qs';

const defaultProduct = {
    key: '0',
	productId: '',
    productName: '',
    quantity: 0,
    productUnit: '',
    price: 0,
    amount: 0,
    remarks: ''
};

const defaultOrder = {
	sequence: null,
    orderNumber: '',
    customerId: null,
    products: [
		{...defaultProduct}
    ],
    totalAmount: 0,
    paymentAmount: 0,
    mem: ''
};






export default {
    namespace: 'orders',
    state: {
        list: [],           // List：TableData
        total: 0 || null,   // List：总数
		timeRange: [],      // 查询：开始日期 - 结束日期
        customerId: '',     // 查询：客户Id
        orderNumber: '',    // 查询：订单号
        loading: false,     // 加载：是否加载
        current: null,
        currentItem: {},
        editorVisible: false,
        editorType: 'create',
        breadcrumbItems: [
            ['/', '首页'],
            ['/orders', '订单'],
        ],
        order: {...defaultOrder},
		customers: [],   // 客户List
		productList: []  // 商品List
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/orders') {
                	dispatch({
                		type:'getCustomers'
					});
					dispatch({
						type:'getProducts'
					});
                    dispatch({
                        type: 'query',
                        payload: location.query
                    });
                    dispatch({
                        type: 'hideEditor'
                    });
                    dispatch({
                        type: 'resetOrder'
                    });
                } else if (location.pathname === '/orders/addorder') {
                    dispatch({
                        type: 'showEditor'
                    });
                }
            });
        },
    },

    // TODO: Action
    effects: {
        // 查询 ~   1、onSearch(日期 + 客户名称 + 订单编号)   2、onPageChange分页查询数据
        *query({payload}, {call, put, select}) {
            // console.log(payload) // 查询： {timeRange: Array(2), customerId: '640d74a80a0f744698d3ea96', orderNumber: 'MDC202305020007', page: 1}
            // console.log(payload) // 分页
			// const isLogin = yield select(({systemUser}) => systemUser.isLogin);  if(!isLogin) return;
            if(!(yield select(({systemUser}) => systemUser.isLogin))) return;
            yield put({type: 'showLoading'});
            yield put({
                type: 'updateQueryKey',
                payload: {
                    page: 1,
                    timeRange: [],
                    customerId: '',
                    orderNumber: '',
                    ...payload,      // 新的payload去替换之前的结果
                }
            });
            let {page, timeRange, customerId, orderNumber} = yield select(state => state.orders);
			customerId = customerId === '00000' ? '' : customerId;  // 等于000000是全部
            // console.log("解析对象", parse({page, timeRange, customerId, orderNumber}))
                // {page: 1, timeRange: Array(2), customerId: '640d74a80a0f744698d3ea96', orderNumber: 'MDC202305100018'}
            const {data} = yield call(query, parse({page, timeRange, customerId, orderNumber}));
            // console.log("订单查询结果", data) // {success: true, orders: Array(3), page: {…}}
            // {
            //     "success": true,
            //     "orders": [{
            //             "customerName": "上海昱庄机械科技有限公司",
            //             "_id": "645b4226316015055ca57a93",
            //             "sequence": 11,
            //             "orderNumber": "MDC202305100011",
            //             "customerId": "640d74a80a0f744698d3ea96",
            //             "totalAmount": 2000,
            //             "paymentAmount": 0,
            //             "mem": "测试redux数据",
            //             "userId": "633302db7d3ce44bdcab8da2",
            //             "createInstance": "2023-05-10T07:05:10.611Z",
            //             "__v": 0,
            //             "products": [
            //                 {
            //                     "key": "0",
            //                     "productId": "642f7b9c0f672825c06161c8",
            //                     "productName": "三星手机",
            //                     "quantity": "1",
            //                     "productUnit": "三星",
            //                     "price": "2000",
            //                     "amount": 2000,
            //                     "remarks": "",
            //                     "userId": "633302db7d3ce44bdcab8da2",
            //                     "type": "out"
            //                 }
            //             ]
            //         }, ],
            //     "page": {
            //         "total": 15,
            //         "current": "2"
            //     }
            // }
            if (data && data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.orders,
                        total: data.page.total,
                        current: data.page.current
                    }
                });
            }
        },

        *create({payload}, {call, put}) { // 新增订单：确定按钮后提交数据   ---   showLoading / createSuccess / resetOrder
            // console.log("是否create")
            // console.log(payload) // {order: {sequence: 20, orderNumber: 'MDC202305110020', customerId: '640d74a80a0f744698d3ea96', products: Array(1), totalAmount: -40, …}}
            yield put({type: 'showLoading'});
            //保存之前清洗数据，对商品条目为空的商品记录进行删除
            const order = payload.order;
            const {products} = order;
            const validProducts = products.filter(product => product.productId !== ''); // 过滤掉 Id不为空 重新赋值
            order['products'] = validProducts;
            const {data} = yield call(create, order); // 赋值后 将Order对象传递到后台
            if (data && data.success) {
                // console.log("后台返回的Message", data)
                    // {success: true, order: {…}}
                    // order: {createInstance, customerId, mem, orderNumber, paymentAmount, userId, __v, _id, totalAmount, products, sequence}
                yield put({
                    type: 'createSuccess',
                    payload: {
                        order: data.order
                    }
                });
                yield put({
                    type: 'resetOrder'
                });
            }
        },

        *modify({payload}, {select, call, put}) { // 修改订单：确定按钮提交数据  ----  hideEditor / showLoading / modifySuccess / resetOrder
            // console.log(payload)
            // {
            //     "order": {
            //         "_id": "645c5c6d0d8a823b4cc204c1",
            //         "sequence": 21,
            //         "orderNumber": "MDC202305110021",
            //         "customerId": "6451ee572dfb792d50d77d80",
            //         "totalAmount": -40,
            //         "paymentAmount": 0,
            //         "mem": "",
            //         "userId": "633302db7d3ce44bdcab8da2",
            //         "createInstance": "2023-05-11T03:09:33.249Z",
            //         "__v": 0,
            //         "products": [
            //             {
            //                 "key": "0",
            //                 "productId": "645a5ee0e7cb2043bcdd50a2",
            //                 "productName": "热水器",
            //                 "quantity": "-2",
            //                 "productUnit": "家电",
            //                 "price": "20",
            //                 "amount": -40,
            //                 "remarks": "",
            //                 "userId": "633302db7d3ce44bdcab8da2",
            //                 "type": "out"
            //             }
            //         ]
            //     }
            // }
            yield put({type: 'hideEditor'});
            yield put({type: 'showLoading'});
            const id = yield select(({orders}) => orders.currentItem['_id']); // 获取进入当前Item的Id
            const newOrder = {...payload.order, id};
            // 保存之前清洗数据，对商品条目为空的商品记录进行删除
            const {products} = newOrder;
            const validProducts = products.filter(product => product.productId !== '');  // 过滤掉Id为空的对象
            newOrder['products'] = validProducts;   // 重新赋值
            const {data} = yield call(modify, newOrder); // 将修改的结果仍给后端
            if (data && data.success) {
                yield put({
                    type: 'modifySuccess',
                    payload: {
                        order: data.order
                    }
                });
                yield put({
                    type: 'resetOrder'
                });
            }
        },

        // 操作 ~ 删除Order
        *del({payload}, {call, put}){ // Payload: 645b90cd316015055ca57aa3      -     showLoading / delSuccess
            console.log("测试删除Order中Item")
            // FIXME: 测试 resetOrder中的Object.assign()
            // yield put({ type: "resetOrder" })

            yield put({type: 'showLoading'});  // 加载Loading
            const {data} = yield call(del, {id: payload});
            if (data && data.success) {
                yield put({
                    type: 'delSuccess',
                    payload
                });
            }
        },

        // 操作 ~ 查看 / 编辑
        *queryOrderById({payload}, {call, put}) {//Payload:{orderId: "64c1", editorType:"modify/detail"} ---  queryOrderByIdSuccess / addBreadcrumbItem
            const {data} = yield call(queryOrderById, payload.orderId);
            // console.log(data)
            // {
            //     "success": true,
            //     "order": {
            //         "_id": "645c5c6d0d8a823b4cc204c1",
            //         "sequence": 21,
            //         "orderNumber": "MDC202305110021",
            //         "customerId": "6451ee572dfb792d50d77d80",
            //         "totalAmount": -40,
            //         "paymentAmount": 0,
            //         "mem": "",
            //         "userId": "633302db7d3ce44bdcab8da2",
            //         "createInstance": "2023-05-11T03:09:33.249Z",
            //         "__v": 0,
            //         "products": [
            //             {
            //                 "key": "0",
            //                 "productId": "645a5ee0e7cb2043bcdd50a2",
            //                 "productName": "热水器",
            //                 "quantity": "-2",
            //                 "productUnit": "家电",
            //                 "price": "20",
            //                 "amount": -40,
            //                 "remarks": "",
            //                 "userId": "633302db7d3ce44bdcab8da2",
            //                 "type": "out"
            //             }
            //         ]
            //     }
            // }
            if (data && data.success) {
                yield put({
                    type: 'queryOrderByIdSuccess',
                    payload: {
                        editorType: payload.editorType,  // type: modify / detail
                        currentItem: data.order,
                        editorVisible: true,
                        order: data.order
                    }
                });
                yield put({
                    type: 'addBreadcrumbItem',
                    payload: {
                        item: ['/orders/modifyorder', '修改订单']
                    }
                });
            }
        },

        // 表头 ~ 添加订单
        *getOrderNumber({payload}, { call, put}) { // Payload: null   --  getOrderNumberSuccess / addBreadcrumbItem
            const {data} = yield call(getOrderNumber, {});
            // console.log(data) // {success: true, sequence: 20, orderNumber: 'MDC202305110020'}
            if (data && data.success) {
                yield put({
                    type: 'getOrderNumberSuccess',
                    payload: {
                        editorType: 'create',           // type: create
						sequence: data.sequence,
                        orderNumber: data.orderNumber,
                        editorVisible: true
                    }
                });
                yield put({
                    type: 'addBreadcrumbItem',
                    payload: {
                        item: ['/orders/addorder', '新增订单']
                    }
                });
            }
        },

        // 获取 客户
		*getCustomers({payload}, {select, call, put}) { // select获取State数据， ----  getCustomersSuccess

            // yield select(data => console.log(data))          // FIXME:　获取所有state属性值
			const isLogin = yield select(({systemUser}) => systemUser.isLogin);
			if(!isLogin) return;
			const {data} = yield call(customers.queryAll, {});  // FIXME: 获取request/customers中请求模块
            // console.log("客户结果", data)
            // {
            //     "success": true,
            //     "customers": [
            //         {
            //             "_id": "00000",
            //             "customerName": "全部"
            //         },
            //         {
            //             "_id": "640d74a80a0f744698d3ea96",
            //             "customerName": "上海昱庄机械科技有限公司",
            //             "contactPeople": "潘涛",
            //             "contactPhone": "021-69792041",
            //             "address": "上海市金山区",
            //             "mem": "上海昱庄机械科技有限公司 / 上海市金山区",
            //             "userId": "633302db7d3ce44bdcab8da2",
            //             "__v": 0
            //         },
            //         {
            //             "_id": "6451ee572dfb792d50d77d80",
            //             "customerName": "天津普传控制设备有限公司",
            //             "contactPeople": " 荀楚翔",
            //             "contactPhone": "022-87185580",
            //             "address": "天津经济技术开发区微电子工业区钱学森道2号",
            //             "userId": "633302db7d3ce44bdcab8da2",
            //             "__v": 0,
            //             "mem": "天津经济技术开发区微电子工业区钱学森道2号\t"
            //         }
            //     ]
            // }
			if(data && data.success) {
				yield put({
					type:'getCustomersSuccess',
					customers: data.customers
				});
			}
		},

        // 获取 产品
		*getProducts({payload}, {select, call, put}) {  // select获取State数据   ---- getProductsSuccess
			const isLogin = yield select(({systemUser})=> systemUser.isLogin);
			if(!isLogin) return;
			const {data} = yield call(resource.query, {});
            // console.log("商品信息", data)
            // {
            //     "success": true,
            //     "products": [
            //         {
            //             "_id": "642f7b9c0f672825c06161c8",
            //             "outAmount": -4,
            //             "salePrice": -40,
            //             "averagePrice": 10,
            //             "inAmount": 2,
            //             "purchasePrice": 0,
            //             "storageAveragePrice": 0,
            //             "productUnit": "三星",
            //             "productName": "三星手机",
            //             "productCode": "A111",
            //             "productType": "手机",
            //             "amount": 6,
            //             "stockFunds": 60,
            //             "profitPrice": -40
            //         },
            //         {
            //             "_id": "645a5ee0e7cb2043bcdd50a2",
            //             "outAmount": -2,
            //             "salePrice": -40,
            //             "averagePrice": 20,
            //             "inAmount": 0,
            //             "purchasePrice": 0,
            //             "storageAveragePrice": 0,
            //             "productUnit": "家电",
            //             "productName": "热水器",
            //             "productCode": "C02",
            //             "productType": "家电",
            //             "amount": 2,
            //             "stockFunds": 40,
            //             "profitPrice": -40
            //         }
            //     ]
            // }
			if(data && data.success){
				yield put({
					type:'getProductsSuccess',
					productList: data.products
				});
			}
		}
    },

    // TODO: reducers
    reducers: {
        fetch(state, action) {
            return {...state, ...action.payload};
        },

        showLoading(state, action){ // 显示 加载Loading
            return {...state, loading: true};
        },
        showEditor(state, action){
            return {...state, ...action.payload, editorVisible: true};
        },

        hideEditor(state, action){ // 可编辑： 否
            return {...state, editorVisible: false};
        },

        // 获取列表
        querySuccess(state, action){
            return {...state, ...action.payload, loading: false};
        },


        queryOrderByIdSuccess(state, action){ // table操作 ~ 查看 / 编辑 订单
            return {...state, ...action.payload};
        },

        createSuccess(state, action){ // 创建订单Order成功
            return {...state, loading: false};
        },

        modifySuccess(state, action){
            // const updateOrder = action.payload.order;
            // const newList = state.list.map(order => order.id == updateOrder.id ? {...order, ...updateOrder} : order);
            // return {...state, list: newList, loading: false};
            return {...state, loading: false};
        },

        delSuccess(state, action){  // table操作 ~ 删除Order
            const newList = state.list.filter(Item => Item._id !== action.payload);
            return {...state, list: newList, loading: false};
        },

        // 更新 查询关键词
        updateQueryKey(state, action){ // FIXME: 关键词
            // console.log("关键词：", action.payload) // {page: 2, timeRange: Array(2), customerId: '640d74a80a0f744698d3ea96', orderNumber: 'MDC202305100018'}
            return {...state, ...action.payload};
        },

        addBreadcrumbItem(state, action){ // 添加面包屑: 1.新增订单
            // console.log(state)
            let breadcrumbItems = state['breadcrumbItems'];             // [['/', '首页'], ['/orders', '订单']]
            let newItems = [...breadcrumbItems, action.payload.item];   // newItem： [['/', '首页'], ['/orders', '订单'], ['/orders/addorder', '新增订单']]
            return {...state, breadcrumbItems: newItems};
        },

        getOrderNumberSuccess(state, action){ // 添加按钮 - 获取单号成功填写数据即可
            // console.log(state)
            // console.log(action) // action: {type: "orders/getOrderNumberSuccess", payload: {editorType: 'create', sequence: 20, orderNumber: 'MDC202305110020', editorVisible: true}}
			let sequence = action.payload.sequence;
			let orderNumber = action.payload.orderNumber;
            let order = state['order']; // order: {sequence: null, orderNumber: '', customerId: null, products: Array(1), totalAmount: 0, …}
            let newOrder = {...order, sequence, orderNumber};
            return {...state, order: newOrder, ...action.payload};
        },

		getCustomersSuccess(state, action){ // 获取 客户数据结果
        	let customers = action.customers;
        	customers.unshift({_id:'00000', customerName:'全部'});  // unshift: 将新项添加到数组起始位置
        	return {...state, customers};
		},


		getProductsSuccess(state, action){ // 获取 商品数据结果
			return {...state, productList: action.productList}; // 产品信息： 手机 / 家电
		},

        resetOrder(state, action){ // 重置订单Order
            let newItems = [
                ['/', '首页'],
                ['/orders', '订单'],
            ];
            // 两种结果相同
			let order = Object.assign({}, defaultOrder, {products: [{...defaultProduct}]});
            let order2 = Object.assign({}, defaultOrder)
            // console.log(order) // {sequence: null, orderNumber: '', customerId: null, products: Array(1), totalAmount: 0, …}
            return {...state, breadcrumbItems: newItems, order, editorVisible: false};
        },


        // setCustomer(state, action){
        //     let order = state['order'];
        //     let newOrder = {...order, customerId: action.payload.customerId};
        //     return {...state, order: newOrder};
        // },

        // resetBreadcrumbItem(state, action){
        //     let newItems = [
        //         ['/', '首页'],
        //         ['/orders', '订单'],
        //     ];
        //     return {...state, breadcrumbItems: newItems, editorVisible: false};
        // },

        // setProducts(state, action){
        //     let order = state['order'];
        //     let {products, totalAmount, paymentAmount} = action.payload;
        //     let newOrder = {...order, products, totalAmount, paymentAmount};
        //     // console.log(newOrder);
        //     return {...state, order: newOrder};
        // },

        // setMem(state, action){
        //     let order = state['order'];
        //     let newOrder = {...order, mem: action.payload.mem};
        //     return {...state, order: newOrder};
        // }
    },

}

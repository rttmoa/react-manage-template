let express = require('express')
let router = express.Router()

let moment = require('moment')
let utils = require('../utils/utils')
let constants = require('../constants/constants')

let Order = require('../models/orders')
let Customer = require('../models/customers')


// ? 实现功能：
    // ? 客户对账列表
    // ? 更新订单支付金额
    // ? 更新账单支付金额

router.route('/').get(function (req, res, next) { // !客户对账列表
    let { page, customerId } = req.query; // * 根据 customerId 筛选
    let limit = constants.PAGE_SIZE;
    let skip = (page - 1) * limit;
    let currentUser = req.session.userInfo;
    let queryCondition = {
        userId: currentUser['_id']
    }
    if (customerId) {
        queryCondition['customerId'] = customerId
    }
    Order.count(queryCondition, function (err, count) {
        Order.find(queryCondition)
            .sort('-createInstance')
            .limit(limit)
            .skip(skip)
            .exec(function (err, orders) {
                if (err) { res.send({ success: false, error: err }) }

                if (count > 0) {
                    //欠债订单
                    const debtOrders = orders.filter(order => order.totalAmount !== order.paymentAmount)
                    // console.log(debtOrders.length) // Orders 表中totalAmount&paymentAmount值
                    const debtOrdersClone = [...debtOrders]
                    // !存储过滤后 每一个customerId对应的orderList
                    const customerObj = {}
                    //按照客户对订单进行归类
                    debtOrdersClone.map(order => {
                        //只有订单上客户存在的才是正常的出库订单，客户为空的结算生成的订单
                        if (order['customerId']) {
                            if (customerObj[order['customerId']]) {
                                customerObj[order['customerId']].push(order)
                            } else {
                                customerObj[order['customerId']] = [order]
                            }
                        }
                    })
                    // console.log("customerObj", customerObj) //* { "6451ee572dfb792d50d77d80": [ model {},model {},model {},.... ] }

                    //欠债的客户列表
                    const debtCustomers = Object.keys(customerObj).map(key => {
                        let debtCustomer = {}
                        debtCustomer['_id'] = key
                        return debtCustomer
                    })
                    // console.log(debtCustomers) //* 获取所有 customerId（表中仅有一个）； [ { _id: '6451ee572dfb792d50d77d80' } ]

                    //账单列表
                    const bills = Object.keys(customerObj).map(key => { // key: 6451ee572dfb792d50d77d80
                        let billObj = {}
                        billObj['_id'] = key
                        billObj['customerId'] = key
                        billObj['totalAmount'] = customerObj[key].reduce((total, order) => total += order.totalAmount, 0)
                        billObj['paymentAmount'] = customerObj[key].reduce((total, order) => total += order.paymentAmount, 0)
                        billObj['debtAmount'] = billObj['totalAmount'] - billObj['paymentAmount']
                        return billObj
                    })
                    // console.log(bills) // 每一个 customerId 对应的bill列表
                    // [
                    //     {
                    //         _id: '6451ee572dfb792d50d77d80',
                    //         customerId: '6451ee572dfb792d50d77d80',
                    //         totalAmount: 41960,
                    //         paymentAmount: 500,
                    //         debtAmount: 41460
                    //     }
                    // ]
                    const customerMap = {}
                    Customer.find({}, function (err, customers) {
                        customers.map((customer) => customerMap[customer['_id']] = customer['customerName'])
                        debtOrders.map((order) => {
                            order['debtAmount'] = order['totalAmount'] - order['paymentAmount']
                            order['customerName'] = customerMap[order['customerId']]
                        })
                        debtCustomers.map((customer) => customer['customerName'] = customerMap[customer['_id']])
                        // 账单中新加一个 customerName = "上海昱庄机械科技有限公司"
                        bills.map((bill) => bill['customerName'] = customerMap[bill['customerId']])

                        // console.log("debtOrders", debtOrders.map(item => item._doc))
                        // console.log("debtCustomers", debtCustomers)
                        // console.log("bills", bills)
                        res.send({
                            success: true,
                            orders: debtOrders, // 欠账订单列表
                            customers: debtCustomers, // 欠账客户列表
                            customerBills: bills, // 账单列表
                            page: { 
                                total: debtOrders.length,
                                current: page
                            }
                        })
                    })
                } else {
                    res.send({
                        success: true,
                        orders: [],
                        customers: [],
                        customerBills: [],
                        page: {
                            total: 0,
                            current: page
                        }
                    })
                }

            })
    })
})
    
router.route('/doClearOrder').post(function (req, res, next) { // !更新订单支付金额
    let currentUser = req.session.userInfo
    let { orderId, paymentAmount } = req.body
    let newOrder = {
        paymentAmount: paymentAmount,
        modifyInstance: new Date()
    }
    // console.log(newOrder)
    Order.findOneAndUpdate({ _id: orderId }, newOrder, { new: true }, function (err, order) {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        }
        res.send({
            success: true,
            order
        })
    })
})

router.route('/doClearBill').post(function (req, res, next) { // !更新账单支付金额
    let currentUser = req.session.userInfo
    let { customerId } = req.body
    let queryCondition = {
        userId: currentUser['_id'],
        customerId: customerId
    }
    Order.find(queryCondition, (err, orders) => {
        if (err) {
            res.send({
                success: false,
                error: err
            })
        } else {
            const modifySuccessItems = orders.map(order => {
                const newOrder = {
                    paymentAmount: order.totalAmount,
                    modifyInstance: new Date()
                }
                Order.findOneAndUpdate({ _id: order['_id'] }, newOrder, { new: true }, function (err, order) {
                    if (err) {
                        res.send({
                            success: false,
                            error: err
                        })
                    }
                })
                return 'success'
            })
            if (modifySuccessItems.length == orders.length) {
                res.send({
                    success: true
                })
            }
        }
    })
})

module.exports = router

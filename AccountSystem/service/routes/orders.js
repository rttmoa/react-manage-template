let express = require("express")
let router = express.Router()

let Product = require("../models/products")
let moment = require("moment")
let utils = require("../utils/utils")
let constants = require("../constants/constants")

// ? Model
let Order = require("../models/orders")
let Customer = require("../models/customers")
let ProductStocks = require("../models/productStocks")


/* 实现功能： */ 
    // ? 订单列表  (Order & Customer)
    // ? 新增订单 和 商品库存  (Order & ProductStocks)

    // ? 获取订单序列号 ( Order )

    // ? 获取订单详情 (Order)
    // ? 修改订单信息 (Order)
    // ? 删除订单 (Order)

router.route("/")
    .get(function (req, res, next) { // !订单列表
        let { page, timeRange, customerId, orderNumber } = req.query
        // /api/orders?page=1&timeRange%5B0%5D=Thu%20Sep%2008%202022%2016%3A08%3A30%20GMT%2B0800&timeRange%5B1%5D=Sat%20Nov%2004%202023%2016%3A08%3A30%20GMT%2B0800&customerId=640d74a80a0f744698d3ea96
        let limit = constants.PAGE_SIZE
        let skip = (page - 1) * limit
        let currentUser = req.session.userInfo
        let queryCondition = {
            userId: currentUser["_id"],
        }
        if (timeRange) {
            let startTime = new Date(timeRange[0])
            let endTime = new Date(timeRange[1])
            // console.log(timeRange)
            // [
            // 'Thu Oct 19 2023 16:13:51 GMT+0800',
            // 'Tue Nov 21 2023 16:13:51 GMT+0800'
            // ]
            // console.log(startTime)
            // console.log(endTime)
            // 2023-10-19T08:13:51.000Z
            // 2023-11-21T08:13:51.000Z
            queryCondition["createInstance"] = {
                $gte: startTime,
                $lte: endTime,
            }
        }
        if (customerId) {
            queryCondition["customerId"] = customerId
        }
        if (orderNumber) {
            queryCondition["orderNumber"] = new RegExp(orderNumber)
        }
        // console.log(Order)
        Order.count(queryCondition, function (err, count) { 
            Order.find(queryCondition)
                .sort("-createInstance")
                .limit(limit)
                .skip(skip)
                .exec(function (err, orders) {
                    if (err) {
                        res.send({
                            success: false,
                            error: err,
                        })
                    } else {
                        if (count > 0) {
                            const customerMap = {}
                            Customer.find({}, function (err, customers) {
                                customers.map(customer => (customerMap[customer["_id"]] = customer["customerName"]))
                                // console.log(customerMap)
                                // {
                                //     '640d74a80a0f744698d3ea96': '上海昱庄机械科技有限公司',
                                //     '6451ee572dfb792d50d77d80': '天津普传控制设备有限公司',
                                //     '64f41de657d41e22b8ea10ce': '深圳市腾讯计算机系统有限公司',
                                //     '64f41e2f57d41e22b8ea10cf': '阿里巴巴（中国）有限公司'
                                // } 
                                // customerId: '640d74a80a0f744698d3ea96', -> customerName: "上海昱庄机械科技有限公司"
                                // console.log(orders)
                                orders.map(order => (order["customerName"] = customerMap[order["customerId"]]))
                                // console.log(orders)
                                res.send({
                                    success: true,
                                    orders: orders,
                                    page: {
                                        total: count,
                                        current: page,
                                    },
                                })
                            })
                        } else {
                            res.send({
                                success: true,
                                orders: orders,
                                page: {
                                    total: count,
                                    current: page,
                                },
                            })
                        }
                    }
                })
        })
    })
    .post(function (req, res, next) { // !新增订单
        let order = req.body
        let currentUser = req.session.userInfo
        // 合并订单对象，NEW ORDER对象模型，实例化保存对象到数据库
        let newOrder = new Order(Object.assign({}, order, { userId: currentUser["_id"], createInstance: new Date() }))

        let products = order["products"]
        let productStocks = products.filter((product) => product.productId && product.productId != "").map((product) => {
            // !商品库存的 userId = 当前登陆用户的 _id
            product["userId"] = currentUser["_id"]
            product["type"] = "out"
            return new ProductStocks(product)
        })
        newOrder.save(function (err, order) {
            if (err) {
                res.send({
                    success: false,
                    error: err,
                })
            } else {
                // ! 增加 商品库存 和 新订单
                if (productStocks.length > 0) {
                    ProductStocks.insertMany(productStocks, (err) => {
                        if (err) {
                            res.send({
                                success: false,
                                error: err,
                            })
                        } else {
                            res.send({
                                success: true,
                                order: order,
                            })
                        }
                    })
                } else {
                    res.send({
                        success: true,
                        order: order,
                    })
                }
            }
        })
    })

router.route("/getOrderNumber")
    .get(function (req, res, next) { // !获取订单序列号  ( 寻找当前用户创建的订单 userId )
        let currentUser = req.session.userInfo
        Order.find({ userId: currentUser["_id"] }, function (error, orders) {
            if (error) {
                res.send({
                    success: false,
                    error: error,
                })
            } else {
                let sequence
                if (orders.length == 0) { // 通过改用户查询是否创建过订单，如果没创建过订单，序列号给1
                    sequence = 1
                } else if (orders.length == 1) {
                    sequence = orders[0].sequence + 1
                } else {
                    sequence = orders.sort((o1, o2) => o2.sequence - o1.sequence)[0].sequence + 1
                }
                res.send({
                    success: true,
                    sequence: sequence,
                    orderNumber: utils.getOrderNumber(sequence),
                })
                // {
                //     "success": true,
                //     "sequence": 22,
                //     "orderNumber": "MDC202310200022"
                // }
            }
        })
    })

router.route("/:orderId")
    .get(function (req, res, next) { // !获取订单详情  /api/orders/645b42e2316015055ca57a9f
        let orderId = req.params.orderId
        Order.findById(orderId, function (err, order) {
            if (err) {
                res.send({
                    success: false,
                    error: err,
                })
            } else {
                res.send({
                    success: true,
                    order: order,
                })
                // {
                //     "success": true,
                //     "order": {
                //         "_id": "645b42e2316015055ca57a9f",
                //         "sequence": 17,
                //         "orderNumber": "MDC202305100017",
                //         "customerId": "6451ee572dfb792d50d77d80",
                //         "totalAmount": 8000,
                //         "paymentAmount": 0,
                //         "mem": "测试redux数据",
                //         "userId": "633302db7d3ce44bdcab8da2",
                //         "createInstance": "2023-05-10T07:08:18.314Z",
                //         "__v": 0,
                //         "products": [
                //             {
                //                 "key": "0",
                //                 "productId": "645a5ee0e7cb2043bcdd50a2",
                //                 "productName": "热水器",
                //                 "quantity": "1",
                //                 "productUnit": "家电",
                //                 "price": "8000",
                //                 "amount": 8000,
                //                 "remarks": "",
                //                 "userId": "633302db7d3ce44bdcab8da2",
                //                 "type": "out"
                //             }
                //         ]
                //     }
                // }
            }
        })
    })
    .put(function (req, res, next) { // !修改订单信息
        let orderId = req.params.orderId
        let order = req.body
        let newOrder = Object.assign({}, order, { modifyInstance: new Date() })
        Order.findOneAndUpdate( { _id: orderId }, newOrder, { new: true }, function (err, order) {
            // console.log(order)
                if (err) {
                    res.send({
                        success: false,
                        error: err,
                    })
                }
                res.send({
                    success: true,
                    order: order,
                })
            }
        )
    })
    .delete(function (req, res, next) { // !删除订单
        let orderId = req.params.orderId
        Order.remove({ _id: orderId }, function (err) {
            if (err) {
                res.send({
                    success: false,
                    error: err,
                })
            } else {
                res.send({
                    success: true,
                })
            }
        })
    })

module.exports = router

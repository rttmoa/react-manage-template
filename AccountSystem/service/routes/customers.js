/**
 * Created by hanlu on 2017/2/28.
 */
let express = require('express')
let router = express.Router()
let Customer = require('../models/customers')
let constants = require('../constants/constants')



// 客户：customer.js
    // 客户的增删改查接口：get、post、put、delete
    // 实现功能：
        // 查询所有客户
        // 根据条件查询客户：页码、模糊词（查询公司名）
        // 添加新客户
        // 根据客户iD 更新用户信息
        // 根据客户iD 删除客户

router.route('/all')
    .get((req, res, next) => {  // 查询所有客户
        let currentUser = req.session.userInfo;
        let queryCondition = {
            userId: currentUser['_id']
        }
        Customer.find(queryCondition, (err, customers) => {
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    customers: customers
                })
            }
        })
    })

router.route('/')
    .get((req, res, next) => { // 根据条件查询客户：页码、模糊词（查询公司名）
        let { page, customerName } = req.query
        let limit = constants.PAGE_SIZE
        let skip = (page - 1) * limit
        let currentUser = req.session.userInfo
        let queryCondition = {
            userId: currentUser['_id']
        }
        if (customerName) {
            queryCondition['customerName'] = new RegExp(customerName)
        }
        Customer.count(queryCondition, (err, count) => {
            Customer.find(queryCondition)
                .limit(limit)
                .skip(skip)
                .exec((err, customers) => {
                    if (err) {
                        res.send({
                            success: false,
                            error: err
                        })
                    } else {
                        res.send({
                            success: true,
                            customers: customers,
                            page: {
                                total: count,
                                current: page
                            }
                        })
                    }
                })
        })
    })
    .post((req, res, next) => { // 添加新客户
        let customer = req.body
        let currentUser = req.session.userInfo
        let newCustomer = new Customer(Object.assign({}, customer, { userId: currentUser['_id'] }))
        newCustomer.save((err, customer) => {
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    customer: customer
                })
            }
        })
    })

router.route('/:customerId')
    .put((req, res, next) => { // 根据客户iD 更新用户信息
        let customerId = req.params.customerId
        let customer = req.body
        let newCustomer = Object.assign({}, customer)
        console.log(customerId)
        Customer.findOneAndUpdate({ _id: customerId }, newCustomer, { new: true }, (err, customer) => {
            console.log(customer['_id'])
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    customer: customer
                })
            }
        })
    })
    .delete((req, res, next) => { // 根据客户iD 删除客户
        let customerId = req.params.customerId
        Customer.remove({ _id: customerId }, (err) => {
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true
                })
            }
        })
    })

module.exports = router

/**
 * Created by hanlu on 2017/2/28.
 */
let express = require('express')
let router = express.Router()
let Supplier = require('../models/suppliers')
let constants = require('../constants/constants')




// 查询所有供应商
router.route('/all')
    .get((req, res, next) => { // 查询所有供应商
        let currentUser = req.session.userInfo
        let queryCondition = {
            userId: currentUser['_id']
        }
        Supplier.find(queryCondition, (err, suppliers) => {
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    suppliers: suppliers
                })
            }
        })
    })

router.route('/')
    .get((req, res, next) => { // 条件查询供应商 （有参数过滤，无参数查所有）
        let { page, supplierName } = req.query
        let limit = constants.PAGE_SIZE
        let skip = (page - 1) * limit
        let currentUser = req.session.userInfo
        let queryCondition = {
            userId: currentUser['_id']
        }
        if (supplierName) {
            queryCondition['supplierName'] = new RegExp(supplierName)
        }
        Supplier.count(queryCondition, (err, count) => {
            Supplier.find(queryCondition)
                .limit(limit)
                .skip(skip)
                .exec((err, suppliers) => {
                    if (err) {
                        res.send({
                            success: false,
                            error: err
                        })
                    } else {
                        res.send({
                            success: true,
                            suppliers: suppliers,
                            page: {
                                total: count,
                                current: page
                            }
                        })
                    }
                })
        })
    })
    .post((req, res, next) => { // 新增供应商
        let supplier = req.body
        let currentUser = req.session.userInfo
        let newSupplier = new Supplier(Object.assign({}, supplier, { userId: currentUser['_id'] }))
        newSupplier.save((err, supplier) => {
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    supplier: supplier
                })
            }
        })
    })

router.route('/:supplierId')
    .put((req, res, next) => {  // 修改供应商信息
        let supplierId = req.params.supplierId
        let supplier = req.body
        let newSupplier = Object.assign({}, supplier)
        console.log(supplierId)
        Supplier.findOneAndUpdate({ _id: supplierId }, newSupplier, { new: true }, (err, supplier) => {
            console.log(supplier['_id'])
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    supplier: supplier
                })
            }
        })
    })
    .delete((req, res, next) => { // 删除供应商
        let supplierId = req.params.supplierId
        Supplier.remove({ _id: supplierId }, (err) => {
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

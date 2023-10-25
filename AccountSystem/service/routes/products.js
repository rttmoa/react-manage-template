/**
 * Created by hanlu on 2017/2/28.
 */
let express = require('express')
let router = express.Router()
let Product = require('../models/products')
let constants = require('../constants/constants')


// 管理 > 商品

router.route('/')
    .get((req, res, next) => { // !商品查询 (Product)
        let { page, productName } = req.query
        let limit = constants.PAGE_SIZE
        let skip = (page - 1) * limit
        let currentUser = req.session.userInfo
        let queryCondition = {
            userId: currentUser['_id']
        }
        if (productName) {
            queryCondition['productName'] = new RegExp(productName)
        }
        Product.count(queryCondition, (err, count) => {
            Product.find(queryCondition)
                .limit(limit)
                .skip(skip)
                .exec((err, products) => {
                    if (err) {
                        res.send({
                            success: false,
                            error: err
                        })
                    } else {
                        res.send({
                            success: true,
                            products: products,
                            page: {
                                total: count,
                                current: page
                            }
                        })
                    }
                })
        })
    })
    .post((req, res, next) => { // !商品增加
        let product = req.body
        let currentUser = req.session.userInfo
        let newProduct = new Product(Object.assign({}, product, { userId: currentUser['_id'] }))
        // console.log('新商品', newProduct)
        // _doc: {
        //     _id: 653276f167054f4510f16a5e,
        //     userId: '633302db7d3ce44bdcab8da2',
        //     productImg: 'http://localhost:4000/uploadfiles/2264106934104524.jpg',
        //     productUnit: '戴尔',
        //     productType: '戴尔',
        //     productName: '戴尔电脑',
        //     productCode: 'AA34234'
        // }
        newProduct.save((err, product) => {
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    product: product
                })
            }
        })
    })

router.route('/:productId')
    .put((req, res, next) => { // !商品详情修改
        let productId = req.params.productId;
        let product = req.body;
        let newProduct = Object.assign({}, product)
        Product.findOneAndUpdate({ _id: productId }, newProduct, { new: true }, (err, product) => {
            if (err) {
                res.send({
                    success: false,
                    error: err
                })
            } else {
                res.send({
                    success: true,
                    product: product
                })
            }
        })
    })
    .delete((req, res, next) => { // !商品详情删除
        let productId = req.params.productId
        Product.remove({ _id: productId }, (err) => {
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

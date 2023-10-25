let express = require('express')
let router = express.Router()

let Home = require('../models/home') 
let Product = require('../models/products')


// ? 测试 Home
// ? mongoose4.5中文；https://mongoose.shujuwajue.com/guide/models

// ! SchemaType
// ! 模型（models）
// ! 查询（queries）
// ! 验证（validation）     内置验证器、自定义验证器、验证错误
// ! 联表（population）
// ! 连接（connections）   多个连接、连接池
// ! 承诺（promises） 
router.route("/").get(async (req, res, next) => {

  // 存 save
  // const h = new Home({ name: "zhangsan" })
  // h.save(function (err) {
  //   if(err) throw new Error(err) 
  // })

  // 存 create
  // Home.create({ name: "zhangsan2", age: 14 }, function(err, res) {
  //   if(err) throw new Error(err)  // Error: ValidationError: age: Path `age` (14) is less than minimum allowed value (18).
  // })

  // !查 find
  // Home.find({}, function(err, data) {
  //   console.log(err)
  //   console.log(data)
  // })
  // const proFind = Home.find({}).exec() // Promise    typeof Promise; function
  // console.log( proFind.then(res => console.log(res)) ) 

  // !查;  find 
  let queryCondition = {
    userId: req.session.userInfo,
    // 一些查询条件 ....
  }
  const count = await Product.count(queryCondition).exec()
  const findDocs = await Product.find(queryCondition).limit(10).skip(1).exec()
  // console.log(findDocs) 


  // !改;  findOneAndUpdate
  let productId = "653276f167054f4510f16a5e"
  let product = { productType: "戴尔1", productUnit: "戴尔2" }
  let newProduct = Object.assign({}, product)
  const updateOne = await Product.findOneAndUpdate({ _id: productId }, newProduct, { new: true }).exec()
  // console.log(updateOne)

  
  // !增； save
  let addProduct = {
    productImg: 'http://localhost:4000/uploadfiles/2264106934104524.jpg',
    productUnit: 'newProduct',
    productType: 'newProduct',
    productName: 'newProduct',
    productCode: 'yysdasd'
  }
  let currentUser = req.session.userInfo;
  let addProducts = new Product(Object.assign({}, addProduct, { userId: currentUser['_id'] }))
  // const addres = await addProducts.save()
  // console.log(addres)


  // !删； remove
  let delProduct = "653276f167054f4510f16a5a"
  const delSuccess = await Product.remove({ _id: delProduct }).exec()
  // console.log(delSuccess)


  res.send({ success: true, results: [] })
})


module.exports = router 
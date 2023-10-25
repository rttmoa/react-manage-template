let express = require('express')
let router = express.Router()


// user.js

/* GET users listing. */
router.get('/', function (req, res, next) {  // /api/users
    res.send('获取用户列表成功')
})

module.exports = router

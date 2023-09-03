let express = require('express')
let router = express.Router()


// user.js

/* GET users listing. */
router.get('/', function (req, res, next) {  // /api/users
    res.send('respond with a resource   成功')
})

module.exports = router

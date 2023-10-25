/**
 * Created by wyf on 2017/1/16.
 */
let express = require('express')
let router = express.Router()



// 鉴权
    // auth.js

router.route('/').get(function (req, res, next) {

    let currentUser = req.session.userInfo;
    // console.log(currentUser) // { _id: '633302db7d3ce44bdcab8da2', username: '15303663375' }

    if (currentUser && currentUser._id && currentUser.username) {
        res.send({ isAuth: true })
    } else {
        res.send({ isAuth: false })
    }
})

module.exports = router

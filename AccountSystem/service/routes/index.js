let express = require('express')
let router = express.Router()



// TODO: 路由拦截：index.js

const routerAuth = function (req, res, next) {
    //对业务数据路由进行拦截
    console.dir("=========================================================================================================> ")
    console.log("request url ==> ", req.url)
    if (/\/api\//.test(req.url)) {
        let currentUser = req.session.userInfo
        // console.error("currentUser", currentUser) // currentUser { _id: '633302db7d3ce44bdcab8da2', username: '15303663375' }
        if (currentUser && currentUser._id && currentUser.username) {
            next()
        } else {
            req.session.userInfo = { _id: '633302db7d3ce44bdcab8da2', username: '15303663375' }
            next()
            // res.send({
            //     isAuth: false
            // });
        };
    } else {
        next()
    }
}
module.exports = routerAuth

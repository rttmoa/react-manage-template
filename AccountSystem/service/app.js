let express = require("express");
let compression = require("compression"); // compression 就是一个常用的 Node.js 压缩工具，可用于压缩和解压缩文件。
let path = require("path");
let favicon = require('serve-favicon');
let logger = require("morgan"); // Morgan 是一个流行的 Node.js 应用程序请求日志记录器中间件，它可以帮助前端开发人员记录 HTTP 请求的详细信息。
// bodyParser用于解析客户端请求的body中的内容，内部使用JSON编码处理，url编码处理以及对于文件的上传处理。
let bodyParser = require("body-parser"); 
let mongoose = require("mongoose");
// express-session使用方法；https://blog.csdn.net/weixin_44827418/article/details/115738852
let session = require("express-session");
// connect-mongo基本用法；https://codeleading.com/article/75571110409/
let MongoStore = require("connect-mongo")(session);
let systemConfig = require("../system.config");

// !连接数据库
mongoose.connect(systemConfig.mongooseConnect, { useMongoClient: true });
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)

let app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        name: "accountSession",
        secret: "account system",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 600000,
            httpOnly: false,
            secure: false,
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);
app.use(compression());

// static file
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../upload")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// console.log(app.get('env')) // development
if (app.get("env") === "development") {
    app.use(function (req, res, next) {
        // set header; https://www.tabnine.com/code/javascript/functions/express/Response/header
        
        // 您希望允许连接的网站
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");

        // 您希望允许的请求方法
        res.setHeader(
            "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );

        // 您希望允许的请求标头
        res.setHeader(
            "Access-Control-Allow-Headers", "X-Requested-With,content-type"
        );

        // 如果您需要网站在发送的请求中包含 cookie，则设置为 true, 到 API（例如，如果您使用 sessions） 
        res.setHeader("Access-Control-Allow-Credentials", true);

        // 传递到下一层中间件
        next();
    });
}

// (function () {
    // Step 1: Create & configure a webpack compiler
    // let webpack = require("webpack");
    // let webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : "../webpack.config");
    // let compiler = webpack(webpackConfig);

    // Step 2: Attach the dev middleware to the compiler & the server
    // app.use(
    //     require("webpack-dev-middleware")(compiler, {
    //         noInfo: true,
    //         publicPath: webpackConfig.output.publicPath,
    //     })
    // );

    // Step 3: Attach the hot middleware to the compiler & the server
    // app.use(
    //     require("webpack-hot-middleware")(compiler, {
    //         log: console.log,
    //         path: "/__webpack_hmr",
    //         heartbeat: 10 * 1000,
    //     })
    // );
// })();



let routesAuth = require("./routes/index");
let users = require("./routes/users");
let system = require("./routes/system");
let auth = require("./routes/auth");
let orders = require("./routes/orders");
let storage = require("./routes/storage");
let customers = require("./routes/customers");
let products = require("./routes/products");
let productStocks = require("./routes/productStocks");
let uploadProductImg = require("./routes/uploadProductImg");
let suppliers = require("./routes/suppliers");
let resource = require("./routes/resource");
let settlement = require("./routes/settlement");
let customerBills = require("./routes/customerBills");
let supplierBills = require("./routes/supplierBills");
let home = require('./routes/home')


app.use(routesAuth); // !统一权限拦截
app.use("/api/users", users); // !用户
app.use("/api/orders", orders); // !订单
app.use("/api/storage", storage); // !入库
app.use("/api/customers", customers); // !客户
app.use("/api/products", products);  // !商品
app.use("/api/productStocks", productStocks); // !商品库存
app.use("/api/resource", resource); // TODO 物资
app.use("/api/settlement", settlement); // !结算
app.use("/api/suppliers", suppliers); // !供应商
app.use("/api/customerBills", customerBills); // ! 客户对账
app.use("/api/supplierBills", supplierBills); // ! 供应商对账
app.use("/api/uploadProductImg", uploadProductImg); // !上传商品图片
app.use("/system", system); // !管理用户
app.use('/api/home', home) // TODO 构建 Home
app.use("/api/auth", auth); // 鉴权

//确保react-router刷新正确路由
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {},
    });
});

module.exports = app; // !导出app，创建http服务

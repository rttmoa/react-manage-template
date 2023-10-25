/**
* Created by wyf on 2016/11/23.
*/
let express = require('express')
let router = express.Router()
let formidable = require('formidable')
let fs = require('fs')
let path = require('path')
let systemConfig = require('../../system.config')

//139.224.195.74
let server = systemConfig.uploadImgServer
let port = systemConfig.serverPort
// 文件将要上传到哪个文件夹下面
let uploadfoldername = 'uploadfiles'
let uploadfolderpath = path.join(__dirname, '../../upload', uploadfoldername)
// console.log(uploadfolderpath) // E:\Project\ReactAdmin\AccountSystem\upload\uploadfiles

// ? 上传图片

router.route('/')
    .post(function (req, res, next) { // !上传图片 获取File{}对象 保存到upload下
        // 使用第三方的 formidable 插件初始化一个 form 对象
        let form = new formidable.IncomingForm()
        form.uploadDir = path.join(__dirname, '../', 'tmp')
        // console.log(path.join(__dirname, '../', 'tmp')) // E:\Project\ReactAdmin\AccountSystem\service\tmp

        form.parse(req, function (err, fields, files) {
            if (err) {return console.log('formidable, form.parse err') }
            console.log('formidable, form.parse ok')
            // 显示参数，例如 token
            // console.log("params - fields", fields)
            // console.log("params - files", files) //  File { }   上传文件对象

            let item;
            let length = 0
            for (item in files) {
                // console.log(item)
                length++
            }
            console.log('文件长度', length)
            if (length === 0) {
                return console.log('files no data')
            }

            for (item in files) {
                let file = files[item]
                // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
                let tempfilepath = file.path
                // 获取文件类型
                let type = file.type
                // console.log("type", type) // * type image/png

                // 获取文件名，并根据文件名获取扩展名
                let filename = file.name;
                // console.log(filename) // * 3aea_xll.jpg
                let extname = filename.lastIndexOf('.') >= 0 ? filename.slice(filename.lastIndexOf('.') - filename.length) : "";
                // 文件名没有扩展名时候，则从文件类型中取扩展名
                if (extname === '' && type.indexOf('/') >= 0) {
                    extname = '.' + type.split('/')[1]
                }
                // console.log("文件拓展名：", extname) //*  .jpg | .png
                // 将文件名重新赋值为一个随机数（避免文件重名）
                filename = 'ImgPath' + Math.random().toString().slice(2) + extname;

                // 构建将要存储的文件的路径
                let filenewpath = path.join(uploadfolderpath, filename)
                console.log('文件路径', filenewpath) //* 文件路径 E:\Project\ReactAdmin\AccountSystem\upload\uploadfiles\6139871820049632.png

                // 将临时文件保存为正式的文件
                fs.rename(tempfilepath, filenewpath, function (err) {
                    // 存储结果
                    let result = ''
                    console.log(tempfilepath)
                    console.log(filenewpath)

                    if (err) {
                        // 发生错误
                        console.log(err)
                        console.log('fs.rename err')
                        result = 'error|save error'
                    } else {
                        // 保存成功
                        console.log('fs.rename done')
                        // 拼接图片url地址
                        result = 'http://' + server + ':' + port + '/' + uploadfoldername + '/' + filename
                        // http://localhost:4000/uploadfiles/7584217451595576.jpg
                    }

                    // 返回结果
                    res.writeHead(200, { 'Content-type': 'text/html' })
                    res.end(result)
                }) // fs.rename
            } // for in
        })
    })

module.exports = router

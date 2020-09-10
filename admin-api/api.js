'use strict';
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const fs = require('fs')
var _ = require('lodash');
const logger = require('./common/logger').logger;
const log = logger.getLogger('API');
const orders = require('./bussiness/orders');
const apps = require('./bussiness/apps');
const fileManagerRouter = require('./router/fileManager');
const questionTypeRouter = require('./router/questionType');
const usersRouter = require('./router/usersRouter');
const questionRouter = require('./router/questionRouter');
const baomingRouter = require('./router/baomingRouter');
const fileManager = require('./bussiness/fileManager');


const Api = function () {
    let express = require('express');
    let app = express();
    //session 配置
    app.use(
        session({
            secret: 'secret',              //  用来对session_id相关的cookie进行签名
            resave: false,
            saveUninitialized: false,
            cookie: {userName: "default", maxAge: 7 * 24 * 60 * 60 * 1000}    // 设置有效期
        })
    )

    //文件上传配置
    app.use(fileUpload(
        {
            limits: {fileSize: 1024 * 1024 * 1024},
        }
    ));

    //json解析配置
    app.use(bodyParser.json(
        {limit: '50mb'}
    ));
    //url编码配置
    app.use(bodyParser.urlencoded({extended: false}));

    //访问配置
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
        res.header('Access-Control-Allow-Headers', 'origin, content-type,x-access-token');
        if (req.method == 'OPTIONS') {
            res.send(200);
        } else {
            next();
        }
    });
    //请求拦截日志
    app.use(function (req, res, next) {
        console.log('request：', 'url:' + req.url + '======' + 'param:' + JSON.stringify(req.body))
        next();

    });

    //路由配置
    app.use('/', fileManagerRouter)
    app.use('/', questionTypeRouter)
    app.use('/', usersRouter)
    app.use('/', questionRouter)
    app.use('/', baomingRouter)

    // 处理由 /upload 页面发送过来的post请求
    app.post('/v1/upload', (req, res) => {
        // req 中的 files 属性由 express-fileupload 中间件添加!? (疑问暂存)
        // 判断 files 属性是否存在 和 是否有文件传来 若无返回400
        console.log(req.files.foo, "yyyy"); // the uploaded file object
        if (req.files === null) {
            return res.status(400).json({msg: 'no file uploaded'});
        }
        // 否则 获取文件
        // file 由后文中 formData.append('file', file) 的第一个参数定义 可自定义为其他名称
        const file = req.files.foo;
        // 移动文件到第一参数指定位置 若有错误 返回500
        if (!fs.existsSync(`${__dirname}/client/public/uploads/`)) {
            fs.mkdirSync(`${__dirname}/client/public/uploads/`, {recursive: true});

        }
        file.mv(`${__dirname}/client/public/uploads/${file.name}`, async err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            // 若无错误 返回一个 json
            // 我们计划上传文件后 根据文件在服务器上的路径 显示上传后的文件
            // 随后我们会在 react 组件中实现
            // 在客户端中的 public 文件夹下创建 uploads 文件夹 用于保存上传的文件
            const result = {
                fileName: file.name,
                filePath: `${__dirname}/client/public/uploads/${file.name}`,
                fileSize: file.size,
                fileUrl: 'http://' + req.hostname + '/' + `uploads/${file.name}`,
                mineType: file.mimetype
            };
            console.log(result)
            fileManager.create(result);
            res.json(result);
        });
    });


    app.post('/v1/order', async function (req, res) {
        try {
            let body = req.body;
            await orders.create(body.orderName, body.orderTime, body.payMoney);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });
    app.get('/v1/order', async function (req, res) {
        try {
            let result = await orders.list();
            res.status(200).send({code: 1000, message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.post('/v1/app', async function (req, res) {
        try {
            let body = req.body;
            await apps.create(body);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });
    app.get('/v1/app', async function (req, res) {
        try {
            let result = await apps.list();
            res.status(200).send({code: 1000, message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.delete('/v1/app/:id', async function (req, res) {
        try {
            let id = req.params.id;
            await apps.delete(id);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.get('/api/client/app', async function (req, res) {
        try {
            let result = await apps.list();
            res.status(200).send({code: 1000, message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    return app;
};

module.exports = Api;

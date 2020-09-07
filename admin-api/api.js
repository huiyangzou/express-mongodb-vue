'use strict';
const bodyParser = require('body-parser');
const logger = require('./common/logger').logger;
const log = logger.getLogger('API');
const users = require('./bussiness/users');
const baoming = require('./bussiness/baoming');
const orders = require('./bussiness/orders');
const apps = require('./bussiness/apps');
const android = require('./bussiness/android');
const fileManagerRouter = require('./router/fileManager');
const questionTypeRouter = require('./router/questionType');
const fileManager = require('./bussiness/fileManager');

const fileUpload = require('express-fileupload');

var _ = require('lodash');


const Api = function () {
    let express = require('express');
    let app = express();
    app.use( fileUpload(
        {
            limits: { fileSize: 50 * 1024 * 1024 },
        }
    ) );

    app.use(bodyParser.json(
        {limit: '50mb'}
    ));
    app.use(bodyParser.urlencoded({extended: false}));

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
    app.use(function (req, res, next) {

        console.log('request：', 'url:' + req.url + '======' + 'param:' + JSON.stringify(req.body))
        next();

    });

    app.use('/',fileManagerRouter)
    app.use('/',questionTypeRouter)

    // 处理由 /upload 页面发送过来的post请求
    app.post('/upload', (req, res) => {
        // req 中的 files 属性由 express-fileupload 中间件添加!? (疑问暂存)
        // 判断 files 属性是否存在 和 是否有文件传来 若无返回400
        console.log(req.files.foo,"yyyy"); // the uploaded file object
        if(req.files === null){
            return res.status(400).json({msg:'no file uploaded'});
        }
        // 否则 获取文件
        // file 由后文中 formData.append('file', file) 的第一个参数定义 可自定义为其他名称
        const file = req.files.foo;
        // 移动文件到第一参数指定位置 若有错误 返回500
        file.mv(`${__dirname}/client/public/uploads/${file.name}`, async err => {
            if(err){
                console.error(err);
                return res.status(500).send(err);
            }
            // 若无错误 返回一个 json
            // 我们计划上传文件后 根据文件在服务器上的路径 显示上传后的文件
            // 随后我们会在 react 组件中实现
            // 在客户端中的 public 文件夹下创建 uploads 文件夹 用于保存上传的文件
            const result={fileName: file.name, filePath: `uploads/${file.name}`,fileSize:file.size,fileUrl:'https://www.93goodtea.com/'+`uploads/${file.name}`,mineType:file.minetype};
            console.log(result)
            fileManager.create(result);
            res.json(result);
        });
    });


    // TODO add authentication

    app.post('/v1/users', async function (req, res) {
        try {
            let body = req.body;
            await users.create(body.name, body.pwd, body.age);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.put('/v1/users/:id', async function (req, res) {
        try {
            let id = req.params.id;
            let body = req.body;
            await users.update(id, body);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('update users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.patch('/v1/users/:id', async function (req, res) {
        try {
            let id = req.params.id;
            let body = req.body;
            await users.patch(id, body);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('path users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.delete('/v1/users/:id', async function (req, res) {
        try {
            let id = req.params.id;
            await users.delete(marketingCode);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.get('/v1/users', async function (req, res) {
        try {
            let result = await users.list();
            res.status(200).send({code: 1000, message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
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


    app.get('/v1/android', async function (req, res) {
        try {
            // var param={_id:req.query._id,typeOne:req.query.typeOne,typeTwo:req.query.typeTwo,currentPage:req.query.currentPage,pageSize:req.query.pageSize,question: {$regex:new RegExp(req.query.question,'i')}};
            const {pageSize, currentPage, _id, typeOne, typeTwo, question} = req.query;
            const param = {pageSize, currentPage};
            if (_id) param._id = _id;
            if (typeOne) param.typeOne = typeOne;
            if (typeTwo) param.typeTwo = typeTwo;
            if (question) param.question = {$regex:new RegExp(question,'i')};
            let result = await android.list(param);
            res.status(200).send({code: 1000, message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.post('/v1/android', async function (req, res) {
        try {
            let body = req.body;
            await android.create(body);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.put('/v1/android/:id', async function (req, res) {
        try {
            let id = req.params.id;
            let body = req.body;
            console.log(JSON.stringify(req.body))
            await android.update(id, body);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('update android error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.delete('/v1/android/:id', async function (req, res) {
        try {
            let id = req.params.id;
            await android.delete(id);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });





    //报名
    app.post('/v1/baoming', async function (req, res) {
        try {
            let body = req.body;

            console.log(JSON.stringify(req.body))
            await baoming.create({name: body.name, phone: body.tel, mark: body.content, number: body.age});
            // res.status(200).send({code:1000,message: 'ok'});
            res.redirect('https://mobile.yangkeduo.com/mall_page.html?mall_id=395451176&msn=5xltkypv6y4vntyfdvcnisqgvm_axbuy&mall_info=%7B%22mall_name%22%3A%22%E4%B9%9D%E5%B1%B1%E8%8C%B6%E7%A4%BE%22%7D&goods_id=153648682527&refer_page_name=goods_detail&refer_page_id=10014_1598839476822_dosxmmaufw&refer_page_sn=10014&_x_share_id=u4yo9yp3c9shbw7svyov97414phaxrbn');
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            // res.status(status).send({code: code, message: message});
            res.redirect('https://mobile.yangkeduo.com/mall_page.html?mall_id=395451176&msn=5xltkypv6y4vntyfdvcnisqgvm_axbuy&mall_info=%7B%22mall_name%22%3A%22%E4%B9%9D%E5%B1%B1%E8%8C%B6%E7%A4%BE%22%7D&goods_id=153648682527&refer_page_name=goods_detail&refer_page_id=10014_1598839476822_dosxmmaufw&refer_page_sn=10014&_x_share_id=u4yo9yp3c9shbw7svyov97414phaxrbn');
        }
    });

    app.put('/v1/baoming/:id', async function (req, res) {
        try {
            let id = req.params.id;
            let body = req.body;
            await baoming.update(id, body);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('update users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.patch('/v1/baoming/:id', async function (req, res) {
        try {
            let id = req.params.id;
            let body = req.body;
            await baoming.patch(id, body);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('path users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.delete('/v1/baoming/:id', async function (req, res) {
        try {
            let id = req.params.id;
            await baoming.delete(id);
            res.status(200).send({code: 1000, message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.get('/v1/baoming', async function (req, res) {
        try {
            let result = await baoming.list();
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

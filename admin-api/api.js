'use strict';
const bodyParser = require('body-parser');
const logger = require('./common/logger').logger;
const log = logger.getLogger('API');
const users = require('./bussiness/users');
const baoming = require('./bussiness/baoming');
const orders = require('./bussiness/orders');
const apps = require('./bussiness/apps');
const android = require('./bussiness/android');
const questionType = require('./bussiness/questionType');
var _ = require('lodash');


const Api = function(){
    let express = require('express');
    let app = express();

    app.use(bodyParser.json(
        {limit: '50mb'}
    ));
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
        res.header('Access-Control-Allow-Headers', 'origin, content-type,x-access-token');
        if (req.method == 'OPTIONS') {
          res.send(200);
        } else {
          next();
        }
    });
    app.use(function(req, res, next) {

        console.log('request：','url:'+req.url+'======'+'param:'+JSON.stringify(req.body))
        next();

    });

    // TODO add authentication

    app.post('/v1/users', async function(req, res){
        try {
            let body = req.body;
            await users.create(body.name, body.pwd, body.age);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.put('/v1/users/:id', async function(req, res){
        try {
            let id = req.params.id;
            let body = req.body;
            await users.update(id, body);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('update users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.patch('/v1/users/:id', async function(req, res){
        try {
            let id = req.params.id;
            let body = req.body;
            await users.patch(id, body);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('path users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.delete('/v1/users/:id', async function(req, res){
        try {
            let id = req.params.id;
            await users.delete(marketingCode);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.get('/v1/users', async function(req, res){
        try {
            let result = await users.list();
            res.status(200).send({code:1000,message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.post('/v1/order', async function(req, res){
        try {
            let body = req.body;
            await orders.create(body.orderName, body.orderTime, body.payMoney);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });
    app.get('/v1/order', async function(req, res){
        try {
            let result = await orders.list();
            res.status(200).send({code:1000,message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.post('/v1/app', async function(req, res){
        try {
            let body = req.body;
            await apps.create(body);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });
    app.get('/v1/app', async function(req, res){
        try {
            let result = await apps.list();
            res.status(200).send({code:1000,message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.delete('/v1/app/:id', async function(req, res){
        try {
            let id = req.params.id;
            await apps.delete(id);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.get('/api/client/app', async function(req, res){
        try {
            let result = await apps.list();
            res.status(200).send({code:1000,message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.get('/v1/android', async function(req, res){
        try {
            var param={_id:req.query._id,typeOne:req.query.typeOne,typeTwo:req.query.typeTwo,currentPage:req.query.currentPage,pageSize:req.query.pageSize,question: {$regex:req.query.question}};
            param= _.pickBy(param, _.isString);

            console.log(JSON.stringify(param))
            let result = await android.list(param);
            res.status(200).send({code:1000,message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.post('/v1/android', async function(req, res){
        try {
            let body = req.body;
            await android.create(body);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.put('/v1/android/:id', async function(req, res){
        try {
            let id = req.params.id;
            let body = req.body;
            console.log(JSON.stringify(req.body))
            await android.update(id, body);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('update android error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });



    app.delete('/v1/android/:id', async function(req, res){
        try {
            let id = req.params.id;
            await android.delete(id);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.get('/v1/questionType', async function(req, res){
        try {
            var param={level:req.query.level,fartherid:req.query.fartherid};
            param= _.pickBy(param, _.isString);
            let result = await questionType.list(param);
            res.status(200).send({code:1000,message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.post('/v1/questionType', async function(req, res){
        try {
            let body = req.body;
            await questionType.create(body);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    app.delete('/v1/questionType/:id', async function(req, res){
        try {
            let id = req.params.id;
            await questionType.delete(id);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });


    //报名
    app.post('/v1/baoming', async function(req, res){
        try {
            let body = req.body;
            await baoming.create(body.name, body.pwd, body.age);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.put('/v1/baoming/:id', async function(req, res){
        try {
            let id = req.params.id;
            let body = req.body;
            await baoming.update(id, body);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('update users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.patch('/v1/baoming/:id', async function(req, res){
        try {
            let id = req.params.id;
            let body = req.body;
            await baoming.patch(id, body);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('path users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.delete('/v1/baoming/:id', async function(req, res){
        try {
            let id = req.params.id;
            await baoming.delete(marketingCode);
            res.status(200).send({code:1000,message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.get('/v1/baoming', async function(req, res){
        try {
            let result = await baoming.list();
            res.status(200).send({code:1000,message: 'ok', data: result});
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

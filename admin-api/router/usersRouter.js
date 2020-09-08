const express = require('express')
const router = express.Router()
const users = require('../bussiness/users');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');



router.post('/v1/login', async function (req, res) {
    try {
        let body = req.body;
        let result =  await users.query(body.username, body.password);
        console.log(result)
        if(result !=null){
            req.session.userName = result.name;
            req.session.isLogin = true;
            res.status(200).send({code: 1000, message: 'ok'});

        }else{
            res.status(200).send({code: 1001, message: 'fail'});

        }
    } catch (error) {
        log.warn('find users error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

router.post('/v1/users', async function (req, res) {
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

router.put('/v1/users/:id', async function (req, res) {
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

router.patch('/v1/users/:id', async function (req, res) {
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

router.delete('/v1/users/:id', async function (req, res) {
    try {
        let id = req.params.id;
        await users.delete(id);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('delete users error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

router.get('/v1/users', async function (req, res) {
    try {

        const {pageSize, currentPage, _id, name} = req.query;
        const param = {pageSize, currentPage};
        if (_id) param._id = _id;
        if (name) param.name = {$regex: new RegExp(name, 'i')};
        let result = await users.list(param);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get users error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});




module.exports = router

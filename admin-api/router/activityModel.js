const express = require('express')
const router = express.Router()
const activity = require('../bussiness/activity');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');

//查询
router.get('/v1/activity', async function (req, res) {
    try {
        const {pageSize, currentPage, _id, typeOne, typeTwo, question} = req.query;
        const param = {pageSize, currentPage};
        if (_id) param._id = _id;
        if (typeOne) param.typeOne = typeOne;
        if (typeTwo) param.typeTwo = typeTwo;
        if (question) param.question = {$regex:new RegExp(question,'i')};
        let result = await activity.list(param);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get article error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//新增
router.post('/v1/activity', async function (req, res) {
    try {
        let body = req.body;
        await activity.create(body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('create article error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//修改
router.put('/v1/activity/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        console.log(JSON.stringify(req.body))
        await activity.update(id, body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('update article error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//删除
router.delete('/v1/activity/:id', async function (req, res) {
    try {
        let id = req.params.id;
        await activity.delete(id);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('delete article error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});



module.exports = router

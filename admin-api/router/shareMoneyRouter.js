const express = require('express')
const router = express.Router()
const shareMoney = require('../bussiness/shareMoney');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');

//查询
router.get('/v1/shareMoney', async function (req, res) {
    try {
        const {pageSize, currentPage, _id, shareMoneyName} = req.query;
        const param = {pageSize, currentPage};
        //指定id查询
        if (_id) param._id = _id;
        //name 模糊查询
        if (shareMoneyName) param.shareMoneyName = {$regex:new RegExp(shareMoneyName,'i')};
        let result = await shareMoney.list(param);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get shareMoney error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});
router.post('/v1/shareMoney/test', async function (req, res) {
    try {
        const {pageSize, currentPage, _id, shareMoneyNames} = req.body;
        var list=[]
        shareMoneyNames.forEach((item)=>{
            list.push(new RegExp(item))
        })
        let result = await shareMoney.listtest(list);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get shareMoney error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//新增
router.post('/v1/shareMoney', async function (req, res) {
    try {
        let body = req.body;
        await shareMoney.create(body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('create shareMoney error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//修改
router.put('/v1/shareMoney/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        await shareMoney.update(id, body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('update shareMoney error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//删除
router.delete('/v1/shareMoney/:id', async function (req, res) {
    try {
        let id = req.params.id;
        await shareMoney.delete(id);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('delete shareMoney error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});



module.exports = router

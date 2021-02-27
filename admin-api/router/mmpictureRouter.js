const express = require('express')
const router = express.Router()
const mmpicture = require('../bussiness/mmpicture');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');

//查询
router.get('/v1/mmpicture', async function (req, res) {
    try {
        const {pageSize, currentPage, _id, mmpictureName} = req.query;
        const param = {pageSize, currentPage};
        //指定id查询
        if (_id) param._id = _id;
        //name 模糊查询
        if (mmpictureName) param.mmpictureName = {$regex:new RegExp(mmpictureName,'i')};
        let result = await mmpicture.list(param);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get mmpicture error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//新增
router.post('/v1/mmpicture', async function (req, res) {
    try {
        let body = req.body;
        await mmpicture.create(body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('create mmpicture error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//修改
router.put('/v1/mmpicture/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        await mmpicture.update(id, body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('update mmpicture error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//删除
router.delete('/v1/mmpicture/:id', async function (req, res) {
    try {
        let id = req.params.id;
        await mmpicture.delete(id);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('delete mmpicture error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});



module.exports = router

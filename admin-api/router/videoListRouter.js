const express = require('express')
const router = express.Router()
const videoList = require('../bussiness/videoList');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');

//查询
router.get('/v1/videoList', async function (req, res) {
    try {
        const {pageSize, currentPage, _id, videoListName} = req.query;
        const param = {pageSize, currentPage};
        //指定id查询
        if (_id) param._id = _id;
        //name 模糊查询
        if (videoListName) param.videoListName = {$regex:new RegExp(videoListName,'i')};
        let result = await videoList.list(param);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get videoList error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//新增
router.post('/v1/videoList', async function (req, res) {
    try {
        let body = req.body;
        await videoList.create(body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('create videoList error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//修改
router.put('/v1/videoList/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        await videoList.update(id, body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('update videoList error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//删除
router.delete('/v1/videoList/:id', async function (req, res) {
    try {
        let id = req.params.id;
        await videoList.delete(id);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('delete videoList error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});



module.exports = router

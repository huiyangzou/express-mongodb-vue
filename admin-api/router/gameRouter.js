const express = require('express')
const router = express.Router()
const game = require('../bussiness/game');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');

//查询
router.get('/v1/game', async function (req, res) {
    try {
        const {pageSize, currentPage, _id, gameName} = req.query;
        const param = {pageSize, currentPage};
        //指定id查询
        if (_id) param._id = _id;
        //name 模糊查询
        if (gameName) param.gameName = {$regex:new RegExp(gameName,'i')};
        let result = await game.list(param);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get game error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//新增
router.post('/v1/game', async function (req, res) {
    try {
        let body = req.body;
        await game.create(body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('create game error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//修改
router.put('/v1/game/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        await game.update(id, body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('update game error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//删除
router.delete('/v1/game/:id', async function (req, res) {
    try {
        let id = req.params.id;
        await game.delete(id);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('delete game error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});



module.exports = router

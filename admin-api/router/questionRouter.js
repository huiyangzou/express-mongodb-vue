const express = require('express')
const router = express.Router()
const android = require('../bussiness/android');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');


router.get('/v1/android', async function (req, res) {
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

router.post('/v1/android', async function (req, res) {
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


router.put('/v1/android/:id', async function (req, res) {
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


router.delete('/v1/android/:id', async function (req, res) {
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



module.exports = router

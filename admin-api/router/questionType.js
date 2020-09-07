const express = require('express')
const router = express.Router()
const questionType = require('../bussiness/questionType');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');


router.get('/v1/questionType', async function (req, res) {
    try {
        var param = {level: req.query.level, fartherid: req.query.fartherid};
        param = _.pickBy(param, _.isString);
        let result = await questionType.list(param);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get users error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

router.post('/v1/questionType', async function (req, res) {
    try {
        let body = req.body;
        await questionType.create(body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('create users error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});


router.delete('/v1/questionType/:id', async function (req, res) {
    try {
        let id = req.params.id;
        await questionType.delete(id);
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

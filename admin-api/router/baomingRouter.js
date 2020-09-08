const express = require('express')
const router = express.Router()
const baoming = require('../bussiness/baoming');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');


//报名
router.post('/v1/baoming', async function (req, res) {
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

router.put('/v1/baoming/:id', async function (req, res) {
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

router.patch('/v1/baoming/:id', async function (req, res) {
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

router.delete('/v1/baoming/:id', async function (req, res) {
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

router.get('/v1/baoming', async function (req, res) {
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




module.exports = router

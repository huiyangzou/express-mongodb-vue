const express = require('express')
const router = express.Router()
const moduleManager = require('../bussiness/moduleManager');
const logger = require('../common/logger').logger;
const log = logger.getLogger('API');
var _ = require('lodash');

//查询
router.get('/v1/moduleManager', async function (req, res) {
    try {
        const {pageSize, currentPage, _id, moduleManagerName} = req.query;
        const param = {pageSize, currentPage};
        //指定id查询
        if (_id) param._id = _id;
        //name 模糊查询
        if (moduleManagerName) param.moduleManagerName = {$regex:new RegExp(moduleManagerName,'i')};
        let result = await moduleManager.list(param);
        res.status(200).send({code: 1000, message: 'ok', data: result});
    } catch (error) {
        log.warn('get moduleManager error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});


//查询目录结构
router.get('/v1/moduleManager/tree', async function (req, res) {
    try {
        const {pageSize, currentPage, _id, moduleLevel} = req.query;
        const param = {};
        param.moduleLevel='1';
        var result = await moduleManager.list(param);
        var newResult=[];
        for(var i=0;i<result.data.length;i++){
            var item=result.data[i];
            param.moduleParentID=item._id;
            param.moduleLevel='2';
            let obj=await moduleManager.list(param)
            item=_.pick(item,['_id','moduleLevel','moduleManagerName']);
            console.log(item,'item')
            obj=_.pick(obj,['data']);
            console.log(obj,'obj')
            var newitem ={...item,...obj}
            console.log(newitem,'newitem')
            newResult.push(newitem)
            console.log(result.data,'resultresult')
        }
        res.status(200).send({code: 1000, message: 'ok', data: newResult});
    } catch (error) {
        log.warn('get moduleManager error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//新增
router.post('/v1/moduleManager', async function (req, res) {
    try {
        let body = req.body;
        await moduleManager.create(body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('create moduleManager error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//修改
router.put('/v1/moduleManager/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let body = req.body;
        await moduleManager.update(id, body);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('update moduleManager error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});

//删除
router.delete('/v1/moduleManager/:id', async function (req, res) {
    try {
        let id = req.params.id;
        await moduleManager.delete(id);
        res.status(200).send({code: 1000, message: 'ok'});
    } catch (error) {
        log.warn('delete moduleManager error', error);
        let status = error.status || 500;
        let code = error.code || '1000';
        let message = error.message || error.name || error;
        res.status(status).send({code: code, message: message});
    }
});




module.exports = router

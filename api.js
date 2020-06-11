'use strict';

const bodyParser = require('body-parser');
const logger = require('./common/logger').logger;
const log = logger.getLogger('API');
const users = require('./users');

const Api = function(){
    let express = require('express');
    let app = express();

    app.use(bodyParser.json(
        {limit: '50mb'}
    ));
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
        res.header('Access-Control-Allow-Headers', 'origin, content-type,x-access-token');
        if (req.method == 'OPTIONS') {
          res.send(200);
        } else {
          next();
        }
    });

    // TODO add authentication

    app.post('/v1/users', async function(req, res){
        try {
            let body = req.body;
            await users.create(body.name, body.pwd, body.age);
            res.status(200).send({message: 'ok'});
        } catch (error) {
            log.warn('create users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.put('/v1/users/:id', async function(req, res){
        try {
            let id = req.params.id;
            let body = req.body;
            await users.update(id, body);
            res.status(200).send({message: 'ok'});
        } catch (error) {
            log.warn('update users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.patch('/v1/users/:id', async function(req, res){
        try {
            let id = req.params.id;
            let body = req.body;
            await users.patch(id, body);
            res.status(200).send({message: 'ok'});
        } catch (error) {
            log.warn('path users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.delete('/v1/users/:id', async function(req, res){
        try {
            let id = req.params.id;
            await users.delete(marketingCode);
            res.status(200).send({message: 'ok'});
        } catch (error) {
            log.warn('delete users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });

    app.get('/v1/users', async function(req, res){
        try {
            let result = await users.list();
            res.status(200).send({message: 'ok', data: result});
        } catch (error) {
            log.warn('get users error', error);
            let status = error.status || 500;
            let code = error.code || '1000';
            let message = error.message || error.name || error;
            res.status(status).send({code: code, message: message});
        }
    });
    
    return app;
};

module.exports = Api;
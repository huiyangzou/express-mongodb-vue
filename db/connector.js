'use strict';

const logger = require('../common/logger').logger;
const log = logger.getLogger('DBConnector');
const mongoose = require('mongoose');

const Connector = {

    connect: function(url, interval) {
        let count = 0;
        let connect_timer = setInterval(function(){
            mongoose.connect(url, { useNewUrlParser: true }, function(e){
                if(e){
                    log.error('mongoose connect error, num: ' + (++count));
                }else {
                    log.info('mongoose connect success, num: ' + (++count));
                    clearTimeout(connect_timer)
                    connect_timer = null;
                }
            });
        }, interval* 1000);

        mongoose.connection.on("error", function (err) {
            log.error("Mongoose connection error: " + err);
        });

        mongoose.connection.on("connected", function () {
            if ("production" !== process.env.NODE_ENV) {
                log.info("Mongoose connection open to " + url);
            } else {
                log.info("Mongoose connection open to db");
            }
        });

        mongoose.connection.on("disconnected", function () {
            log.info("Mongoose connection disconnected");
        });
    }
};

module.exports = Connector;

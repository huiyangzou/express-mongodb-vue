'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Apps');
const utils = require('./../common/utils');
const appsModule = require('./../db/modules/appsModule');

const AppsModule = {

    create: async function(params){
        // TODO verifyParameters_

        await appsModule.create(params);
        return 'ok';
    },

    update: async function(id,body){

        let userInfo=await appsModule.findOne({_id:id})
        userInfo.orderName=body.orderName;
        userInfo.orderTime=body.orderTime;
        await  appsModule.update(userInfo)
        return 'ok';
    },

    delete: async function(id){
        await appsModule.delete({_id:id})
        return 'ok';
    },

    patch: async function(){
        return 'ok';
    },

    list: async function(){
        return appsModule.findMany();
    }
};

module.exports = AppsModule

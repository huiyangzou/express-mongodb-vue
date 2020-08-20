'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Apps');
const utils = require('./../common/utils');
const appsModule = require('./../db/modules/appsModule');

const AppsModule = {

    create: async function(params){
        // TODO verifyParameters_
        let {appkey} =params;
        let userInfo=await appsModule.findOne({appkey:appkey})
        if(userInfo==null){
            await appsModule.create(params);
        }else{
            throw {status: 200, code: '1002', message: 'App already exists'};
        }

    },

    update: async function(id,body){

        let userInfo=await appsModule.findOne({_id:id})
        userInfo.orderName=body.orderName;
        userInfo.orderTime=body.orderTime;
        await  appsModule.update(userInfo)
    },

    delete: async function(id){
        await appsModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(){
        return appsModule.findMany();
    }
};

module.exports = AppsModule

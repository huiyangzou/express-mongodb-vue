'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Android');
const utils = require('./../common/utils');
const androidModule = require('./../db/modules/androidModule');

const AndroidModule = {

    create: async function(params){
        try{
            await androidModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'android item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await androidModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  androidModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await androidModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return androidModule.findMany(param);
    }
};

module.exports = AndroidModule

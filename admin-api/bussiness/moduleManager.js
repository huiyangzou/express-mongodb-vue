'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('ModuleManager');
const utils = require('./../common/utils');
const moduleManagerModule = require('./../db/modules/moduleManagerModule');

const ModuleManagerModule = {

    create: async function(params){
        try{
            await moduleManagerModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'moduleManager item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await moduleManagerModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  moduleManagerModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await moduleManagerModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return moduleManagerModule.findMany(param);
    }
};

module.exports = ModuleManagerModule

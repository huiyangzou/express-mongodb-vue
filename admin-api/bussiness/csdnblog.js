'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Csdnblog');
const utils = require('./../common/utils');
const csdnblogModule = require('./../db/modules/csdnblogModule');

const CsdnblogModule = {

    create: async function(params){
        try{
            await csdnblogModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'csdnblog item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await csdnblogModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  csdnblogModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await csdnblogModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return csdnblogModule.findMany(param);
    }
};

module.exports = CsdnblogModule

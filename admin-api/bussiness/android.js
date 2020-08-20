'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Android');
const utils = require('./../common/utils');
const androidModule = require('./../db/modules/androidModule');

const AndroidModule = {

    create: async function(params){
        // TODO verifyParameters_
        let {question} =params;
        let userInfo=await androidModule.findOne({question:question})
        if(userInfo==null){
            await androidModule.create(params);
        }else{
            throw {status: 200, code: '1002', message: 'App already exists'};
        }

    },

    update: async function(id,body){

        let userInfo=await androidModule.findOne({_id:id})
        userInfo.question=body.question;
        userInfo.answer=body.answer;
        await  androidModule.update(userInfo)
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

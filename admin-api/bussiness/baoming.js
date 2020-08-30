'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Android');
const utils = require('./../common/utils');
const baomingModule = require('./../db/modules/baomingModule');

const BaomingModule = {

    create: async function(params){
        // TODO verifyParameters_
        let {question} =params;
        let userInfo=await baomingModule.findOne({question:question})
        if(userInfo==null){
            await baomingModule.create(params);
        }else{
            throw {status: 200, code: '1002', message: 'App already exists'};
        }

    },

    update: async function(id,body){

        let userInfo=await baomingModule.findOne({_id:id})
        userInfo.question=body.question;
        userInfo.answer=body.answer;
        console.log(JSON.stringify(userInfo))
        await  baomingModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await baomingModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return baomingModule.findMany(param);
    }
};

module.exports = BaomingModule

'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Goods');
const utils = require('./../common/utils');
const goodsModule = require('./../db/modules/goodsModule');

const GoodsModule = {

    create: async function(params){
        let {question} =params;
        let userInfo=await goodsModule.findOne({question:question})
        if(userInfo==null){
            await goodsModule.create(params);
        }else{
            throw {status: 200, code: '1002', message: 'question already exists'};
        }

    },

    update: async function(id,body){

        let userInfo=await goodsModule.findOne({_id:id})
        userInfo.question=body.question;
        userInfo.answer=body.answer;
        console.log(JSON.stringify(userInfo))
        await  goodsModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await goodsModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return goodsModule.findMany(param);
    }
};

module.exports = GoodsModule

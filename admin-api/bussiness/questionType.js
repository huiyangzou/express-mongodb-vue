'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Android');
const utils = require('./../common/utils');
const questionTypeModule = require('./../db/modules/questionTypeModule');

const QuestionTypeModule = {

    create: async function(params){
        // TODO verifyParameters_
        let {questionTypeName} =params;
        let userInfo=await questionTypeModule.findOne({questionTypeName:questionTypeName})
        if(userInfo==null){
            await questionTypeModule.create(params);
        }else{
            throw {status: 200, code: '1002', message: 'App already exists'};
        }

    },

    update: async function(id,body){

        let userInfo=await questionTypeModule.findOne({_id:id})
        userInfo.orderName=body.orderName;
        userInfo.orderTime=body.orderTime;
        await  questionTypeModule.update(userInfo)
    },

    delete: async function(id){
        await questionTypeModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(params){
        return questionTypeModule.findMany(params);
    }
};

module.exports = QuestionTypeModule

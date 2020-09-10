'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Category');
const utils = require('./../common/utils');
const categoryModule = require('./../db/modules/categoryModule');

const CategoryModule = {

    create: async function(params){
        let {question} =params;
        let userInfo=await categoryModule.findOne({question:question})
        if(userInfo==null){
            await categoryModule.create(params);
        }else{
            throw {status: 200, code: '1002', message: 'question already exists'};
        }

    },

    update: async function(id,body){

        let userInfo=await categoryModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  categoryModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await categoryModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return categoryModule.findMany(param);
    }
};

module.exports = CategoryModule

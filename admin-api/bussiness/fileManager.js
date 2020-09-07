'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('fileManager');
const utils = require('./../common/utils');
const fileManagerModule = require('./../db/modules/fileManagerModule');

const FileManagerModule = {

    create: async function(params){
        // TODO verifyParameters_
        let {question} =params;
        let userInfo=await fileManagerModule.findOne({question:question})
        if(userInfo==null){
            await fileManagerModule.create(params);
        }else{
            throw {status: 200, code: '1002', message: 'App already exists'};
        }

    },

    update: async function(id,body){

        let userInfo=await fileManagerModule.findOne({_id:id})
        userInfo.question=body.question;
        userInfo.answer=body.answer;
        console.log(JSON.stringify(userInfo))
        await  fileManagerModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await fileManagerModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return fileManagerModule.findMany(param);
    }
};

module.exports = FileManagerModule

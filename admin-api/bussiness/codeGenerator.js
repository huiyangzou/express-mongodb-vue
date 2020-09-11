'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('CodeGenerator');
const utils = require('./../common/utils');
const codeGeneratorModule = require('./../db/modules/codeGeneratorModule');
const generatorTools = require('../../generatorTools')


const CodeGeneratorModule = {

    create: async function(params){
        try{
           const codeInfo= await generatorTools.createFile(params.codeGeneratorKey,params.codeGeneratorModuleName)
            params=Object.assign(params,codeInfo);
            await codeGeneratorModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'codeGenerator item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await codeGeneratorModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  codeGeneratorModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await codeGeneratorModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return codeGeneratorModule.findMany(param);
    }
};

module.exports = CodeGeneratorModule

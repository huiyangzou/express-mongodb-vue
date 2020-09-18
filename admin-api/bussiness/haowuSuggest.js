'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('HaowuSuggest');
const utils = require('./../common/utils');
const haowuSuggestModule = require('./../db/modules/haowuSuggestModule');

const HaowuSuggestModule = {

    create: async function(params){
        try{
            await haowuSuggestModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'haowuSuggest item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await haowuSuggestModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  haowuSuggestModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await haowuSuggestModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return haowuSuggestModule.findMany(param);
    }
};

module.exports = HaowuSuggestModule

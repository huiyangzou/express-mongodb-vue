'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('ShareMoney');
const utils = require('./../common/utils');
const shareMoneyModule = require('./../db/modules/shareMoneyModule');

const ShareMoneyModule = {

    create: async function(params){
        try{
            await shareMoneyModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'shareMoney item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await shareMoneyModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  shareMoneyModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await shareMoneyModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return shareMoneyModule.findMany(param);
    }
    ,

    listtest: async function(param){
        return shareMoneyModule.findManytest(param);
    }
};

module.exports = ShareMoneyModule

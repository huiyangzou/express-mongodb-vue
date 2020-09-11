'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Activity');
const utils = require('./../common/utils');
const activityModule = require('./../db/modules/activityModule');

const ActivityModule = {

    create: async function(params){
        try{
            await activityModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'activity item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await activityModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  activityModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await activityModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return activityModule.findMany(param);
    }
};

module.exports = ActivityModule

'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Mmpicture');
const utils = require('./../common/utils');
const mmpictureModule = require('./../db/modules/mmpictureModule');

const MmpictureModule = {

    create: async function(params){
        try{
            await mmpictureModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'mmpicture item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await mmpictureModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  mmpictureModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await mmpictureModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return mmpictureModule.findMany(param);
    }
};

module.exports = MmpictureModule

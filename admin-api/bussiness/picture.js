'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Picture');
const utils = require('./../common/utils');
const pictureModule = require('./../db/modules/pictureModule');

const PictureModule = {

    create: async function(params){
        try{
            await pictureModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'picture item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await pictureModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  pictureModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await pictureModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return pictureModule.findMany(param);
    }
};

module.exports = PictureModule

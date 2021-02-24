'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Likemovie');
const utils = require('./../common/utils');
const likemovieModule = require('./../db/modules/likemovieModule');

const LikemovieModule = {

    create: async function(params){
        try{
            await likemovieModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'likemovie item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await likemovieModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  likemovieModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await likemovieModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return likemovieModule.findMany(param);
    }
};

module.exports = LikemovieModule

'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Likevideoplayer');
const utils = require('./../common/utils');
const likevideoplayerModule = require('./../db/modules/likevideoplayerModule');

const LikevideoplayerModule = {

    create: async function(params){
        try{
            await likevideoplayerModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'likevideoplayer item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await likevideoplayerModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  likevideoplayerModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await likevideoplayerModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return likevideoplayerModule.findMany(param);
    }
};

module.exports = LikevideoplayerModule

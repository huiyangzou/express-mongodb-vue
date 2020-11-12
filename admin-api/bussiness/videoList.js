'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('VideoList');
const utils = require('./../common/utils');
const videoListModule = require('./../db/modules/videoListModule');

const VideoListModule = {

    create: async function(params){
        try{
            await videoListModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'videoList item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await videoListModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  videoListModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await videoListModule.delete({_id:id})
    },
    deleteAll: async function(){
        await videoListModule.delete({})
    },

    patch: async function(){
    },

    list: async function(param){
        return videoListModule.findMany(param);
    }
};

module.exports = VideoListModule

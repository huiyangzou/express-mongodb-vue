'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Game');
const utils = require('./../common/utils');
const gameModule = require('./../db/modules/gameModule');

const GameModule = {

    create: async function(params){
        try{
            await gameModule.create(params);
        }catch (e) {
            throw {status: 200, code: '1002', message: 'game item already exists'};
        }

    },

    update: async function(id,body){
        let userInfo=await gameModule.findOne({_id:id})
        userInfo= Object.assign(userInfo,body);
        console.log(JSON.stringify(userInfo))
        await  gameModule.update({_id:id},{$set: userInfo})
    },

    delete: async function(id){
        await gameModule.delete({_id:id})
    },

    patch: async function(){
    },

    list: async function(param){
        return gameModule.findMany(param);
    }
};

module.exports = GameModule

'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Users');
const utils = require('./../common/utils');
const usersModule = require('./../db/modules/usersModule');

const UsersModule = {
    query: async function(name,pwd){
        let params = {
            name: name,
            pwd: utils.MD5(pwd),
        }

        console.log(params)
        return usersModule.findOne(params);
    },

    create: async function(name, pwd, age){
        // TODO verifyParameters_

        let addItem = {
            name: name,
            pwd: utils.MD5(pwd),
            age: age
        }
        await usersModule.create(addItem);
        return 'ok';
    },

    update: async function(id,body){

        let userInfo=await usersModule.findOne({_id:id})
        userInfo.name=body.name;
        userInfo.age=body.age;
        await  usersModule.update(userInfo)
        return 'ok';
    },

    delete: async function(id){
        await usersModule.delete({_id:id})
        return 'ok';
    },

    patch: async function(){
        return 'ok';
    },

    list: async function(params){
        console.log("xyyxyxyxyxyxyxyyxyxyx")
        return usersModule.findMany(params);
    }
};

module.exports = UsersModule

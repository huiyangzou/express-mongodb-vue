'use strict';

const logger = require('./../common/logger').logger;
const log = logger.getLogger('Users');
const utils = require('./../common/utils');
const ordersModule = require('./../db/modules/ordersModule');

const OrdersModule = {

    create: async function(orderName, orderTime, payMoney){
        // TODO verifyParameters_

        let addItem = {
            orderName: orderName,
            orderTime:orderTime,
            payMoney: payMoney
        }
        await ordersModule.create(addItem);
        return 'ok';
    },

    update: async function(id,body){

        let userInfo=await ordersModule.findOne({_id:id})
        userInfo.orderName=body.orderName;
        userInfo.orderTime=body.orderTime;
        await  ordersModule.update(userInfo)
        return 'ok';
    },

    delete: async function(){
        await ordersModule.delete({_id:id})
        return 'ok';
    },

    patch: async function(){
        return 'ok';
    },

    list: async function(){
        return ordersModule.findMany();
    }
};

module.exports = OrdersModule

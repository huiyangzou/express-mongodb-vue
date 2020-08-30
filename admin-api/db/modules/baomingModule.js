'use strict';

const logger = require('../../common/logger').logger;
const log = logger.getLogger('AppsModule');
var _ = require('lodash');
const baomingModel = require('../models/baomingModel');

const BaomingModel = {

    create: async function(data){
        try {
            await baomingModel.create(data);
            return 'ok';
        } catch (error) {
            log.warn('create error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    update: async function(conditions, doc){
        try {
            await baomingModel.update(conditions, doc);
            return 'ok'
        } catch (error) {
            log.warn('update error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    delete: async function(conditions){
        try {
            await baomingModel.deleteMany(conditions);
            return 'ok'
        } catch (error) {
            log.warn('delete error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    findOne: async function(conditions){
        try {
            return await baomingModel.findOne(conditions);
        } catch (error) {
            log.warn('delete error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    findMany: async function(conditions){
        try {
            console.log(conditions.currentPage+conditions.pageSize)
            var currentPage=parseInt(conditions.currentPage);
            var pageSize=parseInt(conditions.pageSize);
            let skip=(currentPage-1)*pageSize;
            conditions= _.omit(conditions, ['currentPage', 'pageSize']);
            console.log(currentPage+"_"+pageSize)
            let count=await baomingModel.find(conditions).count();
            var data=await baomingModel.find(conditions).skip(skip).limit(pageSize);
            return  {total:count,data:data,currentPage:currentPage};
        } catch (error) {
            log.warn('find error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    }
};

module.exports = BaomingModel;

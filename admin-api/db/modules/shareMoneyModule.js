'use strict';

const logger = require('../../common/logger').logger;
const log = logger.getLogger('AppsModule');
var _ = require('lodash');
const shareMoneyModel = require('../models/shareMoneyModel');

const ShareMoneyModel = {

    create: async function(data){
        try {
            await shareMoneyModel.create(data);
            return 'ok';
        } catch (error) {
            log.warn('create error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    update: async function(conditions, doc){
        try {
            await shareMoneyModel.update(conditions, doc);
            return 'ok'
        } catch (error) {
            log.warn('update error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    delete: async function(conditions){
        try {
            await shareMoneyModel.deleteMany(conditions);
            return 'ok'
        } catch (error) {
            log.warn('delete error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    findOne: async function(conditions){
        try {
            return await shareMoneyModel.findOne(conditions);
        } catch (error) {
            log.warn('delete error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    findMany: async function(conditions){
        try {
            const currentPage = parseInt(conditions.currentPage);
            const pageSize = parseInt(conditions.pageSize);
            let skip=(currentPage-1)*pageSize;
            conditions= _.omit(conditions, ['currentPage', 'pageSize']);
            let count=await shareMoneyModel.countDocuments(conditions);
            const data = await shareMoneyModel.find(conditions).skip(skip).limit(pageSize);
            return  {total:count,data:data,currentPage:currentPage};
        } catch (error) {
            log.warn('find error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },
    findManytest: async function(conditions){
        try {
            const data =await  shareMoneyModel.aggregate([{ $match:{ shareMoneyImage: { $in: conditions } }},{$sort:{id:-1}}]);
            return  data;
        } catch (error) {
            log.warn('find error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    }
};

module.exports = ShareMoneyModel;

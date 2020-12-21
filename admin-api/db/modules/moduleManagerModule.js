'use strict';

const logger = require('../../common/logger').logger;
const log = logger.getLogger('AppsModule');
var _ = require('lodash');
const moduleManagerModel = require('../models/moduleManagerModel');

const ModuleManagerModel = {

    create: async function(data){
        try {
            await moduleManagerModel.create(data);
            return 'ok';
        } catch (error) {
            log.warn('create error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    update: async function(conditions, doc){
        try {
            await moduleManagerModel.update(conditions, doc);
            return 'ok'
        } catch (error) {
            log.warn('update error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    delete: async function(conditions){
        try {
            await moduleManagerModel.deleteMany(conditions);
            return 'ok'
        } catch (error) {
            log.warn('delete error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    },

    findOne: async function(conditions){
        try {
            return await moduleManagerModel.findOne(conditions);
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
            let count=await moduleManagerModel.countDocuments(conditions);
            const data = await moduleManagerModel.find(conditions).skip(skip).limit(pageSize);
            return  {total:count,data:data,currentPage:currentPage};
        } catch (error) {
            log.warn('find error,', error);
            throw {status: 500, code: '1401', message: 'database error'};
        }
    }
};

module.exports = ModuleManagerModel;

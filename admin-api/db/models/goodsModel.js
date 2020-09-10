'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
    id: { type: String, description: "The ID of goods " },
    question: { type: String, description: "问题"},
    answer: { type: String,  description: "答案"},
    typeOne: { type: String, description: "一级类型"},
    typeTwo: { type: String, description: "二级类型"}
});

module.exports = mongoose.model('goods', GoodsSchema, 'goods');

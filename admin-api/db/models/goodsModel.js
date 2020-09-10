'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
    id: { type: String, description: "The ID of goods " },
    goodsName: { type: String, description: "商品名称"},
    goodsLink: { type: String, description: "商品链接"},
    goodsImage: { type: String, description: "商品链接"},

});

module.exports = mongoose.model('goods', GoodsSchema, 'goods');

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CsdnblogSchema = new Schema({
    id: { type: String, description: "The ID of csdnblog " },
    csdnblogName: { type: String, description: "csdnblogName"},
    csdnblogImage: { type: String,  description: "csdnblogImage"},
    csdnblogLink: { type: String, description: "csdnblogLink"},
    tag: { type: String, description: "标签"},
    des: { type: String, description: "描述"},
    create_date: { type: String, description: "创建时间"},
    read_count: { type: String, description: "阅读数量"},
    comment_count: { type: String, description: "评论数量"},
});

module.exports = mongoose.model('csdnblog', CsdnblogSchema, 'csdnblog');

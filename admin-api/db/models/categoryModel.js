'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    id: { type: String, description: "The ID of category " },
    categoryName: { type: String, description: "问题"},
    categoryImage: { type: String,  description: "答案"},
    categoryLink: { type: String, description: "一级类型"},
});

module.exports = mongoose.model('category', CategorySchema, 'category');

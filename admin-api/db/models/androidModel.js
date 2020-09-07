'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AndroidSchema = new Schema({
    id: { type: String, description: "The ID of android" },
    question: { type: String, description: "The 标题备注 of app"},
    answer: { type: String,  description: "The APPKEY of app"},
    typeOne: { type: String, description: "The APPKEY of app"},
    typeTwo: { type: String, description: "The APPKEY of app"}
});

module.exports = mongoose.model('android', AndroidSchema, 'android');

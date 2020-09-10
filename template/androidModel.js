'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AndroidSchema = new Schema({
    id: { type: String, description: "The ID of android " },
    androidName: { type: String, description: "androidName"},
    androidImage: { type: String,  description: "androidImage"},
    androidLink: { type: String, description: "androidLink"},
});

module.exports = mongoose.model('android', AndroidSchema, 'android');

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HelloSchema = new Schema({
    id: { type: String, description: "The ID of hello " },
    helloName: { type: String, description: "helloName"},
    helloImage: { type: String,  description: "helloImage"},
    helloLink: { type: String, description: "helloLink"},
});

module.exports = mongoose.model('hello', HelloSchema, 'hello');

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NameSchema = new Schema({
    id: { type: String, description: "The ID of name " },
    nameName: { type: String, description: "nameName"},
    nameImage: { type: String,  description: "nameImage"},
    nameLink: { type: String, description: "nameLink"},
});

module.exports = mongoose.model('name', NameSchema, 'name');

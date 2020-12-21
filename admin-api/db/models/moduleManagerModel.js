'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleManagerSchema = new Schema({
    id: { type: String, description: "The ID of moduleManager " },
    moduleManagerName: { type: String, description: "moduleManagerName"},
    moduleManagerImage: { type: String,  description: "moduleManagerImage"},
    moduleManagerLink: { type: String, description: "moduleManagerLink"},
    moduleLevel: { type: String, description: "moduleLevel"},
    moduleParentID: { type: String, description: "moduleParentID"},
});

module.exports = mongoose.model('moduleManager', ModuleManagerSchema, 'moduleManager');

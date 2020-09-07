'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: { type: String, required: true, description: "The name of user" },
    pwd: { type: String, required: true, description: "The password of user"},
});

module.exports = mongoose.model('users', UsersSchema, 'users');

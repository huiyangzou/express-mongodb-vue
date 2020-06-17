'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: { type: Schema.Types.String, required: true, description: "The name of user" },
    pwd: { type: Schema.Types.String, required: true, description: "The password of user"},
    age: { type: Schema.Types.Number, required: false, description: "The age of user"}
});

module.exports = mongoose.model('users', UsersSchema, 'users');

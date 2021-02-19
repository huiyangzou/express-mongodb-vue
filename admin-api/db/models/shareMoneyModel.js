'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShareMoneySchema = new Schema({
    id: { type: String, description: "The ID of shareMoney " },
    shareMoneyName: { type: String, description: "shareMoneyName"},
    shareMoneyImage: { type: String,  description: "shareMoneyImage"},
    shareMoneyLink: { type: String, description: "shareMoneyLink"},
});

module.exports = mongoose.model('shareMoney', ShareMoneySchema, 'shareMoney');

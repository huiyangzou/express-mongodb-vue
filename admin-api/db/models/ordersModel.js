'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    orderName: { type: Schema.Types.String, required: true, description: "The orderName of order" },
    orderTime: { type: Schema.Types.String, required: true, description: "The orderTime of order"},
    payMoney: { type: Schema.Types.Number, required: true, description: "The payMoney of order"}
});

module.exports = mongoose.model('orders', OrdersSchema, 'orders');

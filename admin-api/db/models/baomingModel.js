'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BaomingSchema = new Schema({
    id: { type: Schema.Types.String, required: false, description: "The ID of android" },
    name: { type: Schema.Types.String, required: false, description: "name"},
    phone: { type: Schema.Types.String, required: false, description: "phone"},
    number: { type: Schema.Types.String, required: false, description: "number"},
    mark: { type: Schema.Types.String, required: false, description: "mark"}
});

module.exports = mongoose.model('baoming', BaomingSchema, 'baoming');

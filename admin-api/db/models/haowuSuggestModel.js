'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HaowuSuggestSchema = new Schema({
    id: { type: String, description: "The ID of haowuSuggest " },
    haowuSuggestName: { type: String, description: "haowuSuggestName"},
    haowuSuggestImage: { type: String,  description: "haowuSuggestImage"},
    haowuSuggestLink: { type: String, description: "haowuSuggestLink"},
});

module.exports = mongoose.model('haowuSuggest', HaowuSuggestSchema, 'haowuSuggest');

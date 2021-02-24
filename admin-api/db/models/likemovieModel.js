'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikemovieSchema = new Schema({
    id: { type: String, description: "The ID of likemovie " },
    likemovieName: { type: String, description: "likemovieName"},
    likemovieImage: { type: String,  description: "likemovieImage"},
    likemovieLink: { type: String, description: "likemovieLink"},
});

module.exports = mongoose.model('likemovie', LikemovieSchema, 'likemovie');

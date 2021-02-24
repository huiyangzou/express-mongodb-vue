'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikevideoplayerSchema = new Schema({
    id: { type: String, description: "The ID of likevideoplayer " },
    likevideoplayerName: { type: String, description: "likevideoplayerName"},
    likevideoplayerImage: { type: String,  description: "likevideoplayerImage"},
    likevideoplayerLink: { type: String, description: "likevideoplayerLink"},
});

module.exports = mongoose.model('likevideoplayer', LikevideoplayerSchema, 'likevideoplayer');

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoListSchema = new Schema({
    id: { type: String, description: "The ID of videoList " },
    videoListName: { type: String, description: "videoListName"},
    videoListImage: { type: String,  description: "videoListImage"},
    videoListLink: { type: String, description: "videoListLink"},
});

module.exports = mongoose.model('videoList', VideoListSchema, 'videoList');

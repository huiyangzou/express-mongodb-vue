'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoListSchema = new Schema({
    id: { type: String, description: "The ID of videoList " },
    videoListName: { type: String, description: "videoListName"},
    videoListImage: { type: String,  description: "videoListImage"},
    videoListLink: { type: String, description: "videoListLink"},
    createTime: { type: String, description: "createTime"},
    area: { type: String, description: "area"},
    language: { type: String, description: "language"},
    release: { type: String, description: "release"},
    alias: { type: String, description: "alias"},
    director: { type: String, description: "director"},
    actor: { type: String, description: "actor"},
    type: { type: String, description: "type"},
});

module.exports = mongoose.model('videoList', VideoListSchema, 'videoList');

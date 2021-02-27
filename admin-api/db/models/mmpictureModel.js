'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MmpictureSchema = new Schema({
    id: { type: String, description: "The ID of mmpicture " },
    mmpictureName: { type: String, description: "mmpictureName"},
    mmpictureImage: { type: String,  description: "mmpictureImage"},
    date: { type: String, description: "date"},
    tag: { type: String, description: "tag"},
    visited: { type: String, description: "visited"},
    userId: { type: String, description: "userId"},


// {"pictureImage":imageUrl,"title":param.title,"date":param.date,"tag":param.tag,"visited":param.visited}
});

module.exports = mongoose.model('mmpicture', MmpictureSchema, 'mmpicture');

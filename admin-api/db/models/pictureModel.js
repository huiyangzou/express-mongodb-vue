'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    id: { type: String, description: "The ID of picture " },
    pictureName: { type: String, description: "pictureName"},
    pictureImage: { type: String,  description: "pictureImage"},
    pictureLink: { type: String, description: "pictureLink"},
});

module.exports = mongoose.model('picture', PictureSchema, 'picture');

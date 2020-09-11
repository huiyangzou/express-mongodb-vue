'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    id: { type: String, description: "The ID of activity " },
    activityName: { type: String, description: "activityName"},
    activityImage: { type: String,  description: "activityImage"},
    activityLink: { type: String, description: "activityLink"},
});

module.exports = mongoose.model('activity', ActivitySchema, 'activity');

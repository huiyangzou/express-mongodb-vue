'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionTypeSchema = new Schema({
    questionTypeName: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
    fartherid: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
    level: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
});

module.exports = mongoose.model('questionType', QuestionTypeSchema, 'questionType');

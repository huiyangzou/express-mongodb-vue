'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileManagerSchema = new Schema({
    fileName: { type: String, description: "文件名"},
    filePath: { type: String,  description: "文件路径"},
    fileUrl: { type: String, description: "文件URL"},
    fileSize: { type: String, description: "文件大小"},
    mineType: { type: String, description: "媒体类型"},
});

module.exports = mongoose.model('fileManager', FileManagerSchema, 'fileManager');

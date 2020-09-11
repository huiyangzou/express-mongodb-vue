'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeGeneratorSchema = new Schema({
    id: { type: String, description: "The ID of codeGenerator " },
    codeGeneratorKey: { type: String, description: "codeGeneratorKey"},
    codeGeneratorModuleName: { type: String,  description: "codeGeneratorModuleName"},
    modelFilePath: { type: String, description: "modelFilePath"},
    moduleFilePath: { type: String, description: "moduleFilePath"},
    bussnessFilePath: { type: String, description: "bussnessFilePath"},
    routerFilePath: { type: String, description: "routerFilePath"},
    vueFilePath: { type: String, description: "vueFilePath"},
    //{modelFilePath:modelFilePath,moduleFilePath:moduleFilePath,bussnessFilePath:bussnessFilePath,routerFilePath:routerFilePath,vueFilePath:vueFilePath}
});

module.exports = mongoose.model('codeGenerator', CodeGeneratorSchema, 'codeGenerator');

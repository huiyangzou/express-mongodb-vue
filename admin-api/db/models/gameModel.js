'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    id: { type: String, description: "The ID of game " },
    gameName: { type: String, description: "gameName"},
    gameImage: { type: String,  description: "gameImage"},
    gameLink: { type: String, description: "gameLink"},
});

module.exports = mongoose.model('game', GameSchema, 'game');

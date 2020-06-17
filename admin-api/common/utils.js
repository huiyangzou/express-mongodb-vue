'use strict';

const crypto = require("crypto");
const utils = {
    MD5: function(data){
        return crypto.createHash('md5').update(data).digest('hex');
    }
}; 
module.exports = utils;
'use strict';

var log4js = require('log4js');
var fs = require('fs');
var path = require('path');

function loadConfig(jsonFile) {
  try {
    var data = fs.readFileSync(path.resolve(process.cwd(), jsonFile), 'utf8');
    var cfg = JSON.parse(data);
    return cfg;
  } catch (e) {
    process.exit(1);
  }
}

function configure() {
  var logConfig = loadConfig('./config/log4js_configuration.json');
  logConfig.appenders[0].layout.tokens =
     { utc : function() { return new Date().toISOString();  } };
  log4js.configure(logConfig);
}

log4js.reconfigure = configure;
configure();

exports.logger= log4js;


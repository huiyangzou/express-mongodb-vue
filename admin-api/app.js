const path = require('path');
const config = require(path.resolve(process.cwd(), './config/config.json'));
const dbConnector = require('./db/connector');

config.db = config.db || {};
config.db.url = config.db.url || "mongodb://127.0.0.1:27017/ivcs-demo";
config.db.connectInterval = config.db.connectInterval || 2;

config.apiServer = config.apiServer || {};
config.apiServer.port = config.apiServer.port || '8080';
config.apiServer.ssl = (config.apiServer.ssl === undefined ? true : !!config.apiServer.ssl);
config.apiServer.keystorePath = config.apiServer.keystorePath || './cert/certificate.pfx';

dbConnector.connect(config.db.url, config.db.connectInterval);

const api = require('./api')();
const apiServer = require('./apiServer');
const server = apiServer(config.apiServer, api);
server.start();

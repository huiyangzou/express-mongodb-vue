'use strict';
var logger = require('./common/logger').logger;
var log = logger.getLogger('ApiServer');
const path = require('path');

const ApiServer = function(config, api) {
    let that = {};

    const startInsecure = async port => {
        require('http').createServer(api).listen(port);
        log.info('http-port', port);
        return 'ok';
      };
    
    const startSecured = async (port, keystorePath) => {
        return new Promise(function(resolve, reject) {
            let cipher = require('./common/cipher');
            let keystore = path.resolve(path.dirname(keystorePath), cipher.kstore);
            cipher.unlock(cipher.k, keystore, function(err, passphrase) {
            if (!err) {
                let option = {pfx: require('fs').readFileSync(keystorePath), passphrase: passphrase};
                let constants = require('constants');
                option.secureOptions = (constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1);
                require('https').createServer(option, api).listen(port);
                log.info('https-port', port);
                resolve('ok');
            } else {
                reject(err);
            }
            });
        });
    };

    that.start = async () => {
        if (!config.ssl) {
            return startInsecure(config.port);
        } else {
            return startSecured(config.port, config.keystorePath);
        }
    };

    return that;
};

module.exports = ApiServer;







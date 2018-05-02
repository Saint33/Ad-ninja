const config = require('./config.json');

exports.get = function(env){
    return config[env] || config.default;
}
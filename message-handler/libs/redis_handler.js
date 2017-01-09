var redis = require('redis');
var client = redis.createClient();

exports.set = function(key, value) {
    client.set(key, value);
}

exports.get = function(key, callback) {
    client.get(key, function(error, value) {
        callback(value)
    });
}


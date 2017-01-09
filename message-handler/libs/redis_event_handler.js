const redis      = require('redis'),
    client       = redis.createClient()


exports.eventHandler = function(pattern, callback) {
    client.on('pmessage', function (pattern, channel, message) {
        callback(message)
    });
    client.psubscribe(pattern);
}



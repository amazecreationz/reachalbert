const fb_handler = require('./libs/firebase_handler.js');
const rs_handler = require('./libs/redis_handler.js');
const rs_event_handler = require('./libs/redis_event_handler.js');

fb_handler.setMessagesWatch('users', function(messages, userid) {
	console.log("MESSAGE RCVD: " +new Date().toLocaleTimeString())
	Object.keys(messages).forEach(function(key) {
		rs_handler.set(userid+'_message', messages[key].text);
	});
});

rs_event_handler.eventHandler('__key*__:set', function(key) {
	if(key == 'albert') {
        rs_handler.get('albert', function(message) {
            fb_handler.sendMessage(message);
        })
    }
});

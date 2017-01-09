import redis
import json
import thread
import time
import parser
import sql
import constants

redis_db = redis.StrictRedis(host="localhost", port=6379, db=0)
redis_db.config_set('notify-keyspace-events', 'AKE')
psub = redis_db.pubsub()
psub.psubscribe('__key*__:set');
print redis_db.keys()

sql.START();
sql.EXECUTE(constants.create_qn_hash_db);
sql.EXECUTE(constants.create_cmd_hash_db);
sql.EXECUTE(constants.create_convo_hash_db);
sql.EXECUTE(constants.create_qn_db);
sql.EXECUTE(constants.create_cmd_db);
sql.EXECUTE(constants.create_convo_db);
sql.END();

def getMessageJSON(user_id, message):
	messageObj = {};
	messageObj['from'] = 'Albert';
	messageObj['userid'] = user_id;
	messageObj['text'] = message;
	messageObj['image'] = '/resources/images/logos/logo.jpg';
	messageObj['time'] = int(round(time.time() * 1000));
	message = json.dumps(messageObj);
	return message;

def print_data( threadId, data):
   	print "%s: %s" % ( threadId, data );	

def parse_message(user_id, message):
	parsed_msg = parser.parse_message(message);
	print parsed_msg;
	if parsed_msg == None:
		parsed_msg = "I am not able to do that yet!";
	redis_db.set('albert', getMessageJSON(user_id, parsed_msg));


for msg in psub.listen():
	redis_key = str(msg['data']);
	if redis_key.endswith('_message'):
		user_id = redis_key.split('_')[0];
		message = redis_db.get(redis_key);
		try:
		   thread.start_new_thread(parse_message, (user_id, message));
		except:
		   print "Error: unable to start thread"
	elif redis_key.endswith('_data'):
		user = json.loads(redis_db.get(redis_key));
		redis_db.set('albert', "Hello "+user['name']);

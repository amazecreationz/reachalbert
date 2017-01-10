import sql
import random
import uuid

def getTable(type):
	table = {
		'QN': 'question',
		'CMD': 'commands',
		'CONVO': 'conversations'
	}
	try:
		return table[type.upper()];
	except:
		return None;
		
def getCleanedMessage(message):
	cleaned_message = message;
	cleaned_message = cleaned_message.replace('\'', '');
	cleaned_message = cleaned_message.replace('?', '');
	cleaned_message = cleaned_message.replace(' ', '_');
	return cleaned_message.upper();
	
def parse_message(message):
	parts = message.split(' ');
	if parts[0].upper() == 'TEACH':
		table = getTable(parts[1]);
		try:
			word = getCleanedMessage(parts[2]);
			reply = parts [3];
			action = parts[4] if len(parts) > 4 else "none";
			sql.START();
			query = "SELECT HASH FROM "+table+"_hash WHERE VALUE='%s'" % (word.upper());
			sql_data = sql.READ(query);
			if not sql_data:
				key = uuid.uuid4();
			else:
				key = sql_data[0][0].split(',')[0];
				
			if action.upper() == 'LINK':
				word = reply.replace('_', ' ').upper();
			else:
				query = "INSERT INTO "+table+" VALUES('%s', '%s', '%s') ON DUPLICATE KEY UPDATE REPLY=CONCAT_WS(',',REPLY,'%s')" % (key, action, reply, reply);
				sql.INSERT(query);
			
			query = "INSERT IGNORE INTO "+table+"_hash VALUES('%s', '%s')" % (key, word);
			sql.INSERT(query);
			sql.END();
			return "Thanks!"
		except:
			return "Check your syntax!"
	else:
		table = 'conversations'
		try:
			sql.START();
			query = "SELECT HASH FROM "+table+"_hash WHERE VALUE='%s'" % (getCleanedMessage(message));
			sql_data = sql.READ(query)[0];
			hash_key = sql_data[0].split(',')[0];
			query = "SELECT ACTION, REPLY FROM "+table+" WHERE HASH='%s'" % (hash_key);
			sql_data = sql.READ(query)[0];
			action = sql_data[0];
			reply = random.choice(sql_data[1].split(',')).replace('_', ' ');
			sql.END();
			return reply;
		except:
			return "I am not able to answer that right now!"

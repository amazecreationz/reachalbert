create_qn_hash_db = """CREATE TABLE IF NOT EXISTS questions_hash(
	HASH varchar(64) NOT NULL,
	VALUE varchar(100) NOT NULL,
	PRIMARY KEY(VALUE))""";

create_cmd_hash_db = """CREATE TABLE IF NOT EXISTS commands_hash(
	HASH varchar(64) NOT NULL,
	VALUE varchar(100) NOT NULL,
	PRIMARY KEY(VALUE))""";
	
create_convo_hash_db = """CREATE TABLE IF NOT EXISTS conversations_hash(
	HASH varchar(64) NOT NULL,
	VALUE varchar(100) NOT NULL,
	PRIMARY KEY(VALUE))""";

create_qn_db = """CREATE TABLE IF NOT EXISTS questions(
	HASH varchar(64) NOT NULL,
	ACTION varchar(100),
	REPLY varchar(255) NOT NULL,
	PRIMARY KEY(HASH))""";

create_cmd_db = """CREATE TABLE IF NOT EXISTS commands(
	HASH varchar(64) NOT NULL,
	ACTION varchar(100),
	REPLY varchar(255) NOT NULL,
	PRIMARY KEY(HASH))""";

create_convo_db = """CREATE TABLE IF NOT EXISTS conversations(
	HASH varchar(64) NOT NULL,
	ACTION varchar(100),
	REPLY varchar(255) NOT NULL,
	PRIMARY KEY(HASH))""";

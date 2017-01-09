import MySQLdb

def START():
	global db;
	global cursor;
	db = MySQLdb.connect("localhost","albert","*Giveaccess123","reachalbert");
	cursor = db.cursor();

def EXECUTE(sql):
	cursor.execute(sql);

def INSERT(sql):
	try:
	   cursor.execute(sql);
	   db.commit();
	except:
	   db.rollback();
	   
def UPDATE(sql):
	try:
	   cursor.execute(sql);
	   db.commit();
	except:
	   db.rollback();

def REMOVE(sql):
	try:
	   cursor.execute(sql);
	   db.commit();
	except:
	   db.rollback();	   

def READ(sql):
	cursor.execute(sql);
	return cursor.fetchall();

def END():
	db.close();

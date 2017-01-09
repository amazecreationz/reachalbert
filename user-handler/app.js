const fb_handler = require('./libs/firebase_handler.js');
const sql_handler = require('./libs/sql_handler.js')
const sql_const = require('./constants/sql_constants.js')

sql_handler.setDatabase(sql_const.ro_db);
sql_handler.getData(sql_const.peoples_table, function(data){});
sql_handler.endConnection();

fb_handler.setUsersWatch('references');

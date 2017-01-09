module.exports = {
    ro_db: {
        host: 'localhost',
        port: '3306',
        database: 'reachalbert_read_only',
        user: 'albert_server',
        password: '*Giveaccess123'
    },
    peoples_table: "CREATE TABLE IF NOT EXISTS people (ID varchar(32) NOT NULL, NAME varchar(50) NOT NULL, NICKNAME varchar(50), EMAIL varchar(100) NOT NULL, USERID varchar(32), PRIORITY int(2) NOT NULL, PRIMARY KEY (EMAIL))",
    insert_into_peoples: "INSERT IGNORE INTO people VALUES(?,?,?,?,?,?)",
}

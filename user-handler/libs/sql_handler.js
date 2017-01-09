const mysql = require("mysql");

var con;

exports.setDatabase = function(sql_info){
    this.con = mysql.createConnection(sql_info);
    this.con.connect(function(err){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    });
}

exports.queryWithParams = function(query, params){
    this.con.query(query, params, function(err, rows){
        if(err) throw err;
        console.log('MYSQL: Query with params executed - ' +query +" , " +params);
        return true;
    });
    return;
}

exports.updateData = function(query){
    this.con.query(query, function(err, rows){
        if(err) throw err;
        console.log('MYSQL: UPDATE Query executed - ' +query);
        return true;
    });
    return;
}

exports.getData = function(query, callback){
    this.con.query(query, function(err, rows){
        if(err) throw err;
        console.log('MYSQL: Query executed - ' +query);
        callback(rows);
        return;
    });
    return;
}

exports.endConnection = function(){  
    this.con.end(function(err) {
        if(err) throw err;
        console.log('MYSQL: Connection Ended!');
    });
    return;
}

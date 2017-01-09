var firebase = require("firebase-admin");
var sql_handler = require("./sql_handler.js");
var sql_const = require('../constants/sql_constants.js')
var serviceAccount = require("../service-account.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://reach-albert.firebaseio.com"
});

var db = firebase.database();

exports.setUsersWatch = function(ref){
	var dbref = db.ref(ref);
    dbref.off();
    sql_handler.setDatabase(sql_const.ro_db);
    dbref.on("child_added", function(snapshot) {
        var user = snapshot.val();
        var id = snapshot.key;
        var person = [id, user.name, user.nickname , user.email, id, 1];
        sql_handler.queryWithParams(sql_const.insert_into_peoples, person, function(data){});
    });
}

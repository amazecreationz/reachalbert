var firebase = require("firebase-admin");
var serviceAccount = require("../service-account.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://reachalbert-ai.firebaseio.com"
});

var db = firebase.database();

exports.setMessagesWatch = function(ref, callback){
    var dbref = db.ref(ref);
    dbref.off();
    console.log("MESSAGE START RCVD: " +new Date().toLocaleTimeString())
    dbref.on("child_changed", function(snapshot) {
        if(snapshot.val().newmessages){
            var user = {
                uid: snapshot.key,
                messages: []
            }
            var messages = snapshot.val().newmessages;
            var updates = {};
            callback(messages, user.uid);
            Object.keys(messages).forEach(function(key) {
                updates[user.uid +'/newmessages/'+key] = null;
            });
            dbref.update(updates);
        }
    });
}

exports.sendMessage = function(message) {
    var message = JSON.parse(message);
    console.log(message.text);
    var dbref = db.ref('users/'+message.userid+'/messages').push(message);
}

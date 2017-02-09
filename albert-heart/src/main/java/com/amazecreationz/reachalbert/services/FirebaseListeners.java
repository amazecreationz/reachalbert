package com.amazecreationz.reachalbert.services;

import com.amazecreationz.reachalbert.actions.ActionHandler;
import com.amazecreationz.reachalbert.constants.GlobalConstants;
import com.amazecreationz.reachalbert.models.FirebaseUser;
import com.amazecreationz.reachalbert.models.Message;
import com.amazecreationz.reachalbert.models.TeachMessage;
import com.amazecreationz.reachalbert.wrappers.UserDatabaseWrapper;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Date;

public class FirebaseListeners implements GlobalConstants {
    private FirebaseDatabase firebaseDatabase;
    public FirebaseListeners() {
        FirebaseOptions options;
        System.out.println("Initialising Firebase Listeners..");
        try {
            options = new FirebaseOptions.Builder()
                    .setServiceAccount(new FileInputStream(SERVICE_ACCOUNT_JSON))
                    .setDatabaseUrl(FIREBASE_DB)
                    .build();
            FirebaseApp.initializeApp(options);
            this.firebaseDatabase = FirebaseDatabase.getInstance();
            this.firebaseDatabase.getReference("status/server_online").setValue(true);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        startUserListeners();
        startPasswordListeners();
        startMessageListeners();
        startTeachListeners();
    }

    private void startUserListeners() {
        System.out.println("Starting Firebase User Listeners..");
        final DatabaseReference db_ref = firebaseDatabase.getReference("references");
        final UserDatabaseWrapper userDatabaseWrapper = new UserDatabaseWrapper();
        db_ref.addChildEventListener(new ChildEventListener() {

            public void onCancelled(DatabaseError arg0) {
            }

            public void onChildAdded(DataSnapshot arg0, String arg1) {
                userDatabaseWrapper.setFirebaseUser(arg0.getValue(FirebaseUser.class));
            }

            public void onChildChanged(DataSnapshot arg0, String arg1) {
                FirebaseUser firebaseUser = arg0.getValue(FirebaseUser.class);
                userDatabaseWrapper.setNickName(firebaseUser.nickname, firebaseUser.email);
            }

            public void onChildMoved(DataSnapshot arg0, String arg1) {
            }

            public void onChildRemoved(DataSnapshot arg0) {
            }
        });
    }

    private void startPasswordListeners() {
        System.out.println("Starting Firebase Password Listeners..");
        final DatabaseReference db_ref = firebaseDatabase.getReference("password");
        final UserDatabaseWrapper userDatabaseWrapper = new UserDatabaseWrapper();
        db_ref.addChildEventListener(new ChildEventListener() {

            public void onCancelled(DatabaseError arg0) {
            }

            public void onChildAdded(DataSnapshot arg0, String arg1) {
                String password = arg0.getValue().toString();
                String uid = arg0.getKey();
                userDatabaseWrapper.setPassword(password, uid);
                db_ref.child(uid).setValue(null);
            }

            public void onChildChanged(DataSnapshot arg0, String arg1) {
            }

            public void onChildMoved(DataSnapshot arg0, String arg1) {
            }

            public void onChildRemoved(DataSnapshot arg0) {
            }
        });
    }

    private void startMessageListeners() {
        System.out.println("Starting Firebase Message Listeners..");
        final DatabaseReference user_ref = firebaseDatabase.getReference("users");
        final DatabaseReference db_ref = firebaseDatabase.getReference("users/messages");
        db_ref.addChildEventListener(new ChildEventListener() {

            public void onCancelled(DatabaseError arg0) {
                System.out.println("Cancelled");
            }

            public void onChildAdded(DataSnapshot arg0, String arg1) {
                Message message = arg0.getValue(Message.class);
                System.out.println("Message Added: " +message.text +" @ - " + new Date());
                db_ref.child(arg0.getKey()).setValue(null);
                user_ref.child(message.uid).child("messages").push().setValue(new ActionHandler(message).getReply());
            }

            public void onChildChanged(DataSnapshot arg0, String arg1) {
                System.out.println("Message Changed");
            }

            public void onChildMoved(DataSnapshot arg0, String arg1) {
                System.out.println("Message Moved");
            }

            public void onChildRemoved(DataSnapshot arg0) {
                System.out.println("Message Removed");
            }
        });
    }

    private void startTeachListeners() {
        System.out.println("Starting Firebase TeachAlbert Listeners..");
        final DatabaseReference db_ref = firebaseDatabase.getReference("users/teach");
        db_ref.addChildEventListener(new ChildEventListener() {

            public void onCancelled(DatabaseError arg0) {
            }

            public void onChildAdded(DataSnapshot arg0, String arg1) {
                TeachMessage teachMessage = arg0.getValue(TeachMessage.class);
                System.out.println("Teach Message Added: " +teachMessage.text +" @ - " + new Date());
                db_ref.child(arg0.getKey()).setValue(null);
            }

            public void onChildChanged(DataSnapshot arg0, String arg1) {
            }

            public void onChildMoved(DataSnapshot arg0, String arg1) {
            }

            public void onChildRemoved(DataSnapshot arg0) {
            }
        });
    }
}
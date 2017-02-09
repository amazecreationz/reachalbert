package com.amazecreationz.reachalbert.wrappers;

import com.amazecreationz.common.services.SQLService;
import com.amazecreationz.reachalbert.constants.GlobalConstants;
import com.amazecreationz.reachalbert.constants.SQLConstants;
import com.amazecreationz.reachalbert.models.FirebaseUser;
import com.amazecreationz.reachalbert.models.People;

import java.sql.ResultSet;
import java.util.UUID;

public class UserDatabaseWrapper implements GlobalConstants, SQLConstants {
    private SQLService sqlService;

    public UserDatabaseWrapper() {
        this.sqlService = new SQLService(REACHALBERT_DB, DB_USERNAME, DB_PASSWORD);
    }

    public void setFirebaseUser(FirebaseUser firebaseUser) {
        String query = "SELECT * FROM people WHERE EMAIL=?";
        sqlService.initPreparedStatement(query);
        sqlService.setString(1, firebaseUser.email);
        try {
            ResultSet resultSet = sqlService.executeQuery();
            String albert_id;
            System.out.println(resultSet);
            if(!resultSet.next()){
                albert_id = UUID.randomUUID().toString();
            } else {
                albert_id = resultSet.getString(ALBERT_ID);
            }
            query = "INSERT INTO people VALUES(?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE NICKNAME = ?, PHONE = ?";
            sqlService.initPreparedStatement(query);
            sqlService.setString(1, albert_id);
            sqlService.setString(2, firebaseUser.name);
            sqlService.setString(3, firebaseUser.email);
            sqlService.setString(4, null);
            sqlService.setString(5, firebaseUser.nickname);
            sqlService.setString(6, firebaseUser.image_url);
            sqlService.setString(7, null);
            sqlService.setString(8, firebaseUser.nickname);
            sqlService.setString(9, null);
            sqlService.executeUpdate();
            query = "INSERT IGNORE INTO credentials ("+ALBERT_ID+","+UID+") VALUES(?,?)";
            sqlService.initPreparedStatement(query);
            sqlService.setString(1, albert_id);
            sqlService.setString(2, firebaseUser.uid);
            sqlService.executeUpdate();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setNickName(String nickName, String email) {
        String query = "UPDATE "+PEOPLES_TABLE+" SET "+NICKNAME+"=? WHERE "+EMAIL+"=?";
        sqlService.initPreparedStatement(query);
        sqlService.setString(1, nickName);
        sqlService.setString(2, email);
        System.out.println(sqlService.getPreparedStatement().toString());
        sqlService.executeUpdate();
    }

    public void setPassword(String password, String uid) {
        String query = "UPDATE "+CREDENTIALS_TABLE+" SET "+PASSWORD+"=? WHERE "+UID+"=?";
        sqlService.initPreparedStatement(query);
        sqlService.setString(1, password);
        sqlService.setString(2, uid);
        System.out.println(sqlService.getPreparedStatement().toString());
        sqlService.executeUpdate();
    }

    public People getUserDetails(String email) {
        String query = "SELECT * FROM people WHERE'EMAIL'=?";
        sqlService.initPreparedStatement(query);
        sqlService.setString(1, email);
        return new People(sqlService.executeQuery());
    }
}

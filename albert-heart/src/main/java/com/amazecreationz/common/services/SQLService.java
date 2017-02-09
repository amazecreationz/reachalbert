package com.amazecreationz.common.services;

import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.Statement;

import org.json.simple.JSONObject;


public class SQLService {
    Connection mysql;
    PreparedStatement preparedStatement = null;

    public SQLService(String db_url, String username, String password) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            mysql = DriverManager.getConnection(db_url +"user=" +username +"&password=" +password);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void initPreparedStatement(String sql){
        try {
            preparedStatement = mysql.prepareStatement(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public PreparedStatement getPreparedStatement() {
        return preparedStatement;
    }

    public void setInt(int index, int value){
        try {
            preparedStatement.setInt(index, value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setFloat(int index, float value){
        try {
            preparedStatement.setFloat(index, value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setString(int index, String value){
        try {
            preparedStatement.setString(index, value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setJSON(int index, JSONObject value){
        StringWriter stringwriter = new StringWriter();
        try {
            value.writeJSONString(stringwriter);
            preparedStatement.setString(index, stringwriter.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void executeUpdate(){
        try {
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public ResultSet executeQuery(){
        try {
            return preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String executeQuery(String query) {
        Statement statement = null;
        String output = null;
        try {
            statement = mysql.createStatement();
            statement.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return output;
    }
}
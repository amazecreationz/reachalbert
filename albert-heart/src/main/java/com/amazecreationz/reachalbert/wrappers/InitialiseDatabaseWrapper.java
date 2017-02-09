package com.amazecreationz.reachalbert.wrappers;

import com.amazecreationz.common.services.SQLService;
import com.amazecreationz.reachalbert.constants.GlobalConstants;
import com.amazecreationz.reachalbert.constants.SQLConstants;

public class InitialiseDatabaseWrapper implements GlobalConstants, SQLConstants{
    private SQLService sqlService;
    public InitialiseDatabaseWrapper() {
        this.sqlService = new SQLService(REACHALBERT_DB, DB_USERNAME, DB_PASSWORD);
        createPeopleTables();
    }

    private void createPeopleTables() {
        String query = "CREATE TABLE IF NOT EXISTS "+ PEOPLES_TABLE+"("
                +ALBERT_ID+" varchar(64) NOT NULL,"
                +NAME+" varchar(50) NOT NULL,"
                +EMAIL+" varchar(50) NOT NULL,"
                +PHONE+" varchar(15),"
                +NICKNAME+" varchar(50),"
                +IMAGE_URL+" varchar(255),"
                +ALIAS+" varchar(255),"
                +"PRIMARY KEY("+ALBERT_ID+"))";
        sqlService.executeQuery(query);
        query = "CREATE TABLE IF NOT EXISTS "+ CREDENTIALS_TABLE +"("
                +ALBERT_ID+" varchar(64) NOT NULL,"
                +UID+" varchar(64) NOT NULL,"
                +PASSWORD+" varchar(20),"
                +"PRIMARY KEY("+UID+"))";
        sqlService.executeQuery(query);
    }
}

package com.amazecreationz.reachalbert.models;

import com.amazecreationz.reachalbert.constants.GlobalConstants;

import java.sql.ResultSet;

public class People implements GlobalConstants{
    public String name;
    public String email;
    public String password;
    public String albert_id;
    public String image_url;
    public String alias;

    public People(ResultSet resultSet) {
        try {
            this.name = resultSet.getString(NAME);
            this.email = resultSet.getString(EMAIL);
            this.password = resultSet.getString(PASSWORD);
            this.albert_id = resultSet.getString(ALBERT_ID);
            this.image_url = resultSet.getString(IMAGE_URL);
            this.alias = resultSet.getString(ALIAS);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}

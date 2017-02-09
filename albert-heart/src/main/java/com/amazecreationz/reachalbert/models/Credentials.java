package com.amazecreationz.reachalbert.models;

import com.amazecreationz.reachalbert.constants.GlobalConstants;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class Credentials implements GlobalConstants{
    public String email;
    public String password;
    public boolean isNewUser;

    public Credentials(String credentials) {
        try {
            JSONObject credentials_obj = (JSONObject) new JSONParser().parse(credentials);
            this.email = credentials_obj.get(EMAIL).toString();
            this.password = credentials_obj.get(PASSWORD).toString();
            this.isNewUser = credentials_obj.get(IS_NEWUSER).toString().equals("true");
        }
        catch (Exception e) {
            System.out.println("Failed to parse credentials");
            e.printStackTrace();
        }
    }
}

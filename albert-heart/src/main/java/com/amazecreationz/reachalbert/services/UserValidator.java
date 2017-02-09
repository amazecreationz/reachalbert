package com.amazecreationz.reachalbert.services;

import com.amazecreationz.reachalbert.models.Credentials;
import com.amazecreationz.reachalbert.models.People;
import com.amazecreationz.reachalbert.wrappers.UserDatabaseWrapper;

public class UserValidator {
    Credentials credentials;

    public UserValidator(Credentials credentials) {
        this.credentials = credentials;
    }

    public boolean validate() {
        People user = new UserDatabaseWrapper().getUserDetails(credentials.email);
        if(user.email != null && credentials.isNewUser) {
            System.out.println(credentials.email +" created!");
            return true;
        }
        else if(credentials.password.equals(user.password)){
            System.out.println(user.name +" validated!");
            return true;
        }
        return false;
    }
}

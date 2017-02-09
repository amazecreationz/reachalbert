package com.amazecreationz.reachalbert.models;

public class FirebaseUser {
    public String name, email, nickname, image_url, uid;

    public FirebaseUser() {
        this.name = "Anonymous";
        this.email = "anonymous@amazecreationz.in";
        this.nickname = "Stranger";
        this.image_url = "/resources/images/logos/logo-large.jpg";
    }

}

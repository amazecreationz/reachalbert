package com.amazecreationz.reachalbert.models;

import com.amazecreationz.reachalbert.constants.GlobalConstants;

import java.util.Date;

public class Message implements GlobalConstants {
    public String name, email, uid, image, text, from;
    public Long time;

    public Message setAlbertMessage(String msg) {
        this.from = "Albert";
        this.image = LOGO;
        this.time = new Date().getTime();
        this.text = msg;
        return this;
    }
}

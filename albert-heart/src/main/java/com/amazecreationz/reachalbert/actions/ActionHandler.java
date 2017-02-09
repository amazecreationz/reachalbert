package com.amazecreationz.reachalbert.actions;

import com.amazecreationz.reachalbert.actions.services.ActionService;
import com.amazecreationz.reachalbert.models.Message;
import com.amazecreationz.reachalbert.parser.Parser;

public class ActionHandler {
    private String replyMessage;

    public ActionHandler(Message message) {
        this.replyMessage = new ActionService(new Parser(message).parse()).getReply();
    }

    public Message getReply(){
        return new Message().setAlbertMessage(this.replyMessage);
    }
}

package com.amazecreationz.reachalbert.actions.services;

import com.amazecreationz.reachalbert.actions.models.ActionParams;
import com.amazecreationz.reachalbert.parser.models.ParsedMessage;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ActionService {
    private ActionParams actionParams;
    private String replyMessage;

    public ActionService(ParsedMessage parsedMessage) {
        this.actionParams = new ActionParams(parsedMessage.script, parsedMessage.args);
        execute();
    }

    private void execute() {
        try {
            Process p = Runtime.getRuntime().exec(actionParams.getProcessCommand());
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
            BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));

            String output;
            while ((output = stdInput.readLine()) != null) {
                System.out.println(output);
                this.replyMessage = output;
            }

            while ((output = stdError.readLine()) != null) {
                System.out.println(output);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getReply() {
        return replyMessage;
    }
}

package com.amazecreationz.reachalbert.actions.models;

import com.amazecreationz.reachalbert.actions.constants.ActionConstants;
import com.amazecreationz.reachalbert.constants.GlobalConstants;

import java.util.Arrays;

public class ActionParams implements GlobalConstants, ActionConstants {
    private String script;
    private String script_type;
    private String[] args;

    public ActionParams(String script, String[] args) {
        this.script = SCRIPTS_DIR + script;
        this.script_type = getScriptType(script);
        this.args = args;
    }

    private String getScriptType(String script) {
        String script_extn = script.substring(script.lastIndexOf('.')+1, script.length());
        if(script_extn.equals("py")) {
            return PYTHON;
        }
        else if(script_extn.equals("sh")) {
            return BASH;
        }
        else {
            return null;
        }
    }

    public String getProcessCommand() {
        String command =  script_type +" " +script;
        if(args != null) {
            command = command +" " + Arrays.toString(args);
        }
        return command;
    }
}
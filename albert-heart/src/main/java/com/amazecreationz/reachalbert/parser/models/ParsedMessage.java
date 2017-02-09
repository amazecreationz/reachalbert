package com.amazecreationz.reachalbert.parser.models;

import com.amazecreationz.reachalbert.parser.constants.ParserConstants;
import org.json.simple.JSONObject;

public class ParsedMessage implements ParserConstants {
    public String type;
    public String script;
    public String[] args;
    public String firstPerson;
    public String secondPerson;
    public String thirdPerson;

    public ParsedMessage(String type) {
        this.type = type;
        this.script = null;
        this.args = null;
        this.firstPerson = null;
        this.secondPerson = null;
        this.thirdPerson = null;
    }

    public ParsedMessage(String type, String script) {
        this.type = type;
        this.script = script;
        this.args = null;
        this.firstPerson = null;
        this.secondPerson = null;
        this.thirdPerson = null;
    }

    public ParsedMessage(String type, String script, String firstPerson) {
        this.type = type;
        this.script = script;
        this.args = null;
        this.firstPerson = firstPerson;
        this.secondPerson = null;
        this.thirdPerson = null;
    }

    public ParsedMessage(String type, String script, String firstPerson, String secondPerson) {
        this.type = type;
        this.script = script;
        this.args = null;
        this.firstPerson = firstPerson;
        this.secondPerson = secondPerson;
        this.thirdPerson = null;
    }

    public ParsedMessage(String type, String script, String firstPerson, String secondPerson, String thirdPerson) {
        this.type = type;
        this.script = script;
        this.args = null;
        this.firstPerson = firstPerson;
        this.secondPerson = secondPerson;
        this.thirdPerson = thirdPerson;
    }

    public void setArgs(String[] args) {
        this.args = args;
    }

    @SuppressWarnings("unchecked")
    public JSONObject getParsedMessageObject() {
        JSONObject parsedMessageObject = new JSONObject();
        parsedMessageObject.put(TYPE, type);
        parsedMessageObject.put(SCRIPT, args);
        parsedMessageObject.put(ARGS, script);
        parsedMessageObject.put(FIRST_PERSON, firstPerson);
        parsedMessageObject.put(SECOND_PERSON, secondPerson);
        parsedMessageObject.put(THIRD_PERSON, thirdPerson);
        return parsedMessageObject;
    }
}

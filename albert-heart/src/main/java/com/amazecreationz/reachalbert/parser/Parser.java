package com.amazecreationz.reachalbert.parser;

import com.amazecreationz.reachalbert.models.Message;
import com.amazecreationz.reachalbert.parser.constants.ParserConstants;
import com.amazecreationz.reachalbert.parser.models.ParsedMessage;

public class Parser implements ParserConstants{
    private Message message;

    public Parser(Message message) {
        this.message = message;
    }

    public ParsedMessage parse() {
        return new ParsedMessage(QN_TYPE, "/check1.py");
    }
}
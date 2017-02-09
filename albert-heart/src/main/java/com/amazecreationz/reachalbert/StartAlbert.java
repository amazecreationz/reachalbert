package com.amazecreationz.reachalbert;
import com.amazecreationz.reachalbert.constants.GlobalConstants;
import com.amazecreationz.reachalbert.services.FirebaseListeners;
import com.amazecreationz.reachalbert.services.Listeners;
import com.amazecreationz.reachalbert.wrappers.InitialiseDatabaseWrapper;

import java.net.URL;
import java.net.URLClassLoader;

public class StartAlbert extends Thread implements GlobalConstants {
    public static void main(String [] args) {
        System.out.println("Hello World! I'm booting up...");
        new InitialiseDatabaseWrapper();
        new FirebaseListeners();
        new Listeners(MY_PORT).start();
    }
}
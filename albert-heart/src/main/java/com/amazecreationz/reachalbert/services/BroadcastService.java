package com.amazecreationz.reachalbert.services;

import java.util.Scanner;

public class BroadcastService extends Thread {
    private Scanner scanner;
    private Broadcasts broadcasts;
    public BroadcastService(Broadcasts broadcasts) {
        this.scanner = new Scanner(System.in);
        this.broadcasts = broadcasts;
    }

    public void run() {
        try {
            while (true) {
                this.broadcasts.sendBroadcastMessage(scanner.nextLine());
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}

package com.amazecreationz.reachalbert.services;

import java.io.DataOutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketTimeoutException;

public class Listeners {
    private ServerSocket serverSocket;
    private Broadcasts broadcasts;

    public Listeners(int port){
        broadcasts = new Broadcasts();
        System.out.println("Starting Socket Listeners..");
        try {
            this.serverSocket = new ServerSocket(port);
            this.serverSocket.setSoTimeout(10000);
            System.out.println("I've started listening at port: " +port);
        }
        catch (Exception e){
            e.printStackTrace();
        }

    }

    public void start() {
        try {
            while(true) {
                Socket client = this.serverSocket.accept();
                broadcasts.addClient(client);
                Thread t = new ListenerService(client, this);
                t.start();
            }
        }
        catch (SocketTimeoutException e) {
            System.out.println("Socket Listen timed out!");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendMessage(Socket client, String message) {
        try {
            DataOutputStream out = new DataOutputStream(client.getOutputStream());
            out.writeUTF(message);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void parseMessage(Socket client, String message) {
        sendMessage(client, "Message Received! \n");
        System.out.println("parse-this:- "+message);
    }
}

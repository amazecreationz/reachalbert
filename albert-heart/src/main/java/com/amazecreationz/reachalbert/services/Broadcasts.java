package com.amazecreationz.reachalbert.services;

import java.io.DataOutputStream;
import java.net.Socket;
import java.util.ArrayList;

public class Broadcasts {
    private ArrayList<Socket> clients;

    public Broadcasts() {
        this.clients = new ArrayList<Socket>();
        new BroadcastService(this).start();
    }

    public void addClient(Socket newClient) {
        clients.add(newClient);
    }

    public ArrayList<Socket> getClients() {
        return clients;
    }

    public void sendBroadcastMessage(String message) {
        DataOutputStream out;
        for(Socket client: clients) {
            try {
                out = new DataOutputStream(client.getOutputStream());
                out.writeUTF(message+"\n");
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}

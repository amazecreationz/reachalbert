package com.amazecreationz.reachalbert.services;

import com.amazecreationz.reachalbert.constants.GlobalConstants;
import com.amazecreationz.reachalbert.models.Credentials;
import org.json.simple.JSONObject;

import java.io.DataInputStream;
import java.io.EOFException;
import java.net.Socket;

public class ListenerService extends Thread implements GlobalConstants {
    private Socket client;
    private Listeners listeners;

    public ListenerService(Socket client, Listeners listeners) {
        this.client = client;
        this.listeners = listeners;
    }

    public void run() {
        try {
            listeners.sendMessage(this.client, "Type in your credentials: ");
            DataInputStream in = new DataInputStream(client.getInputStream());
            while(true) {
                String account = in.readUTF();
                /*Remove this*/
                JSONObject json = new JSONObject();
                json.put(EMAIL, account);
                json.put(PASSWORD, PASSWORD);
                account = json.toJSONString();
                /*Remove this*/
                Credentials credentials = new Credentials(account);
                if(new UserValidator(credentials).validate()){
                    break;
                }
                listeners.sendMessage(this.client, credentials.email +" is not a valid account!\n");
                listeners.sendMessage(this.client, "Type in your credentials: ");
            }

            listeners.sendMessage(this.client, "User validated!\n");
            while(true) {
                String msg = in.readUTF();
                if(msg.equals("close")){
                    client.close();
                    return;
                }
                listeners.parseMessage(this.client, msg);
            }
        }
        catch (EOFException e) {
            System.out.println("User disconnected!");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}

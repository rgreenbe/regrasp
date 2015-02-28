import java.net.*;
import java.util.*;
import java.io.*;
 
public class ServerMain
{
	
	String json=
	"{\"type\" : \"event\",\"testID\" : 12345,\"objects\" : [{\"id\" : 123,\"type\" : \"hand\",\"x\" : 0.2341,\"y\" : 0.6521,\"z\" : 0.1254},{\"id\" : 124,\"type\" : \"object\",\"x\" : 0.4245,\"y\" : 0.4234,\"z\" : 0.4246}]}";
    public static void main(String[] args)
    {
        new ServerMain();
    }
     
    public ServerMain() 
    {
        Scanner a = new Scanner(System.in);

        //We need a try-catch because lots of errors can be thrown
        try {
            ServerSocket sSocket = new ServerSocket(4000);
            System.out.println("Server started at: " + new Date()); 
            //Wait for a client to connect
            Socket socket;
             
            socket= sSocket.accept();
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             
            //Tell the client that he/she has connected
            output.println("You have connected at: " + new Date());
            //Loop that runs server functions

            while(true) {
            	
            	String message=a.nextLine();
                //This will wait until a line of text has been sent
                System.out.println(message);
               	output.println(json);
                
            }
        } catch(IOException exception) {
            System.out.println("Error: " + exception);
        }
    }
}
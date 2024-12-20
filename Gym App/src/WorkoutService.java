import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

import java.util.concurrent.Executors;

import javax.swing.plaf.synth.SynthEditorPaneUI;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import org.json.JSONObject;
import java.sql.*;


public class WorkoutService {
        public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {
        int port = 8081;
        // System.out.println("Server started on port " + port);

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.setExecutor(Executors.newFixedThreadPool(20)); 

        
        if (connect() == null) {
            createNewDatabase();
        }

        server.createContext("/workout", new Forwarder());
        server.createContext("/workout/", new Receiver());

        server.setExecutor(null);

        server.start();

        System.out.println("Server started on port " + port);

    }


        /**
        * Handles HTTP POST requests and sends an HTTP POST request.
        * This class implements the {@code HttpHandler} interface for HTTP POST requests.
        */
        static class Forwarder implements HttpHandler {
            /**
            * Handles an incoming HTTP POST request sends a status code back with proper command response
            * @param exchange The {@code HttpExchange} object representing the communication
            * between the client and the server.
            * @throws IOException If an I/O error occurs during the handling of the POST request.
            */

            public void handle(HttpExchange exchange) throws IOException {
                // Handle POST request for /workout
                if ("POST".equals(exchange.getRequestMethod())) {
                    JSONObject workoutJson = new JSONObject(getRequestBody(exchange));

                    System.out.println(workoutJson.toString());

                    if (workoutJson.getString("command").equals("putSplit")) {

                    } else if (workoutJson.getString("command").equals("removeSplit")) {

                    } else if (workoutJson.getString("command").equals("putWeek")) {

                    } else if (workoutJson.getString("command").equals("removeWeek")) {

                    } else {
                        sendResponse(exchange, "Invalid Command", 400);
                    }
                } else {
                    // Send a 405 Method Not Allowed response for non-POST request
                    exchange.sendResponseHeaders(405, 0);
                    exchange.close();
                }

            }
    }

        /**
        * Handles HTTP GET requests and sends an HTTP POST request.
        * This class implements the {@code HttpHandler} interface for HTTP GET requests.
        */
        static class Receiver implements HttpHandler {

                /**
                * Handles an incoming HTTP GET request and sends a status code back with the proper command response
                * @param exchange The {@code HttpExchange} object representing the communication
                * between the client and the server.
                * @throws IOException If an I/O error occurs during the handling of the GET request.
                */

                @Override
                public void handle(HttpExchange exchange) throws IOException {
                    // Handle GET requests for recieve context
                    if ("GET".equals(exchange.getRequestMethod())) {

                    } else {
                        // Send a 405 Method Not Allowed response for non-POST request
                        exchange.sendResponseHeaders(405, 0);
                        exchange.close();
                    }
                }
        }








        public static String getRequestBody(HttpExchange exchange) throws IOException {
            try (BufferedReader br = new BufferedReader(new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8))) {
                StringBuilder requestBody = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    requestBody.append(line);
                }
                return requestBody.toString();
            }
        }
    
        public static void sendResponse(HttpExchange exchange, String response, int statusCode) throws IOException {
            exchange.sendResponseHeaders(statusCode, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes(StandardCharsets.UTF_8));
            os.close();
        }


        private static void createNewDatabase() throws SQLException {
            String path = "jdbc:sqlite:sqlite/db/workoutDB.db";
            

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    DatabaseMetaData metaData = con.getMetaData();
                    System.out.println("Driver name: " + metaData.getDriverName());
                    System.out.println("New db created!");
                }
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }

        
        private static Connection connect() throws ClassNotFoundException {
            Connection con = null;
            try {
                // Load the SQLite JDBC driver
                Class.forName("org.sqlite.JDBC");

                // Connect to the SQLite database
                String path = "jdbc:sqlite:sqlite/db/workoutDB.db";

                con = DriverManager.getConnection(path);
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
            return con;
        }

        public static void createNewTable() {
            String path = "jdbc:sqlite:sqlite/db/workoutDB.db";
            /*
             * table will hold all different workouts for user to pick from based on their name and then enter their weight, notes, etc. (shoulderPress, benchPress, etc.)
             * table2 will hold the name of the split along with a string containting all workouts for the day (shoulderPress,benchPress,...)
             * table3 will hold the weekly schedule based on weekday then the split for that day or restday
             */
            String table = "CREATE TABLE IF NOT EXISTS workouts (\n)"
                    + "   workout string PRIMARY KEY,\n"
                    + "   weight integer NOT NULL,\n"
                    + "   notes string NOT NULL,\n" +
                    ");";

            String table2 = "CREATE TABLE IF NOT EXISTS splits (\n)"
            + "   splitName string PRIMARY KEY,\n"
            + "   workouts string NOT NULL,\n" + 
            ");";

            String table3 = "CREATE TABLE IF NOT EXISTS schedule (\n)"
            + "   weekday string PRIMARY KEY,\n"
            + "   splitName string NOT NULL,\n" + 
            ");";

        }

        // public static void insert(UserService user, HttpExchange exchange) throws SQLException, IOException {


        // }

        // public static UserService getUser(int id) {

        // }

        // private static void updateUser(UserService user) {

        // }

        // private static void deleteUser(int id) {

        // }


}

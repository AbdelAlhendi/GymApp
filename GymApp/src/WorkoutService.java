package src;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.Executors;

import javax.swing.plaf.synth.SynthEditorPaneUI;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.Authenticator.Result;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.sql.*;




public class WorkoutService {
    private static String currentDir = System.getProperty("user.dir");
    private static String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";
    private static String path2 = "jdbc:sqlite:" + currentDir + "GymApp/sqlite/db/workoutDB.db";
        public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {
        int port = 8082;
        // System.out.println("Server started on port " + port);

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.setExecutor(Executors.newFixedThreadPool(20)); 

        try {
            Connection conTest = DriverManager.getConnection(path);
        } catch (SQLException e) {
            System.out.println("Incorrect sql file path, switching");
            path = "jdbc:sqlite:" + currentDir + "/GymApp/sqlite/db/workoutDB.db";
        }
        
        if (connect() == null) {
            createNewDatabase();
        }
        createNewTable();

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
                    JSONObject json = new JSONObject(getRequestBody(exchange));

                    System.out.println(json.toString());

                    if (json.getString("command").equals("postSplit")) {
                        JSONObject splitJson = json.getJSONObject("splitName");
                        String splitName = splitJson.keys().next().toString();
                        JSONArray workoutLst = splitJson.getJSONArray(splitName);
                        System.out.println(workoutLst);
                        try {
                            JSONObject workoutLstReturn = getSplit(splitName, exchange);
                            if (workoutLstReturn.length() != 0) {
                                sendResponse(exchange, "Split already inserted", 405);
                            } else {
                                try {
                                    insertSplit(splitName, workoutLst, exchange);
                                } catch (SQLException | IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                }
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }

                        sendResponse(exchange, "Split inserted successfully", 200);


                    } else if (json.getString("command").equals("putSplit")) {
                        JSONObject splitJson = json.getJSONObject("splitName");
                        String splitName = splitJson.keys().next().toString();
                        JSONArray workoutLst = splitJson.getJSONArray(splitName);

                        try {
                            JSONObject workoutLstReturn = getSplit(splitName, exchange);
                            if (workoutLstReturn.length() == 0) {
                                sendResponse(exchange, "No Split to update", 405);
                            } else {
                                try {
                                    updateSplit(splitName, workoutLst, exchange);
                                } catch (SQLException | IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                }
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }

                        sendResponse(exchange, "Split updated successfully", 200);

                    } else if (json.getString("command").equals("deleteSplit")) {
                        String splitName = json.getString("splitName");

                        try {
                            JSONObject workoutLst = getSplit(splitName, exchange);
                            if (workoutLst.length() == 0) {
                                sendResponse(exchange, "No Split to delete", 405);
                            } else {
                                try {
                                    deleteSplit(splitName, exchange);
                                } catch (SQLException | IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                } 
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }
                        sendResponse(exchange, "Split deleted successfully", 200);

                    } else if (json.getString("command").equals("postWeek")) {
                        JSONObject weekJson = json.getJSONObject("week");
                        String weekday = weekJson.keys().next().toString();
                        String splitName = weekJson.getString(weekday);


                        try {
                            String splitNameReturn = getWeek(weekday, exchange);
                            if (!splitNameReturn.equals("")) {
                                sendResponse(exchange, "Weekday already inserted", 405);
                            } else {
                                try {
                                    insertWeek(weekday, splitName, exchange);
                                } catch (SQLException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                } catch (IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                }

                                sendResponse(exchange, "Weekday inserted successfully", 200);
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }

                    } else if (json.getString("command").equals("putWeek")) {
                        JSONObject weekJson = json.getJSONObject("week");
                        String weekday = weekJson.keys().next().toString();
                        String splitName = weekJson.getString(weekday);

                        try {
                            String splitNameReturn = getWeek(weekday, exchange);
                            if (splitNameReturn.equals("")) {
                                sendResponse(exchange, "No Weekday to update", 405);
                            } else {
                                try {
                                    updateWeek(weekday, splitName, exchange);
                                } catch (SQLException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                } catch (IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                }

                                sendResponse(exchange, "Weekday updated successfully", 200);
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }

                    } else if (json.getString("command").equals("deleteWeek")) {
                        String weekday = json.getString("week");

                        try {
                            String splitName = getWeek(weekday, exchange);
                            if (splitName.equals("")) {
                                sendResponse(exchange, "No Weekday to delete", 405);
                            } else {
                                try {
                                    deleteWeek(weekday, exchange);
                                } catch (SQLException | IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                } 
                                sendResponse(exchange, "Weekday deleted successfully", 200);
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }

                    } else if (json.getString("command").equals("postWorkout")) {
                        JSONObject workoutJson = json.getJSONObject("workouts");
                        String workout = workoutJson.keys().next().toString();

                        JSONArray workoutJsonLst = workoutJson.getJSONArray(workout);

                        int weight = workoutJsonLst.getInt(0);
                        String notes = workoutJsonLst.getString(1);

                        try {
                            JSONArray workoutStatsLst = getWorkout(workout, exchange);
                            if (workoutStatsLst.length() != 0) {
                                sendResponse(exchange, "Workout already inserted", 405);
                            } else {
                                try {
                                    insertWorkout(workout, weight, notes, exchange);
                                } catch (SQLException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                } catch (IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                }

                                sendResponse(exchange, "Workout inserted successfully", 200);
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }
                    
                    } else if (json.getString("command").equals("putWorkout")) {
                        JSONObject workoutJson = json.getJSONObject("workouts");
                        String workout = workoutJson.keys().next().toString();

                        JSONArray workoutJsonLst = workoutJson.getJSONArray(workout);

                        int weight = -1;
                        String notes = null;
                        
                        if (workoutJsonLst.length() == 2) {
                            weight = workoutJsonLst.getInt(0);
                            notes = workoutJsonLst.getString(1);
                        } else {
                            try {
                                weight = workoutJsonLst.getInt(0);
                            } catch (JSONException e) {
                                notes = workoutJsonLst.getString(0);
                            }
                        }
                        
                        try {
                            JSONArray workoutStatsLst = getWorkout(workout, exchange);
                            if (workoutStatsLst.length() == 0) {
                                sendResponse(exchange, "No Workout to update", 405);
                            } else {
                                try {
                                    updateWorkout(workout, weight, notes, exchange);
                                } catch (SQLException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                } catch (IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                }

                                sendResponse(exchange, "Workout updated successfully", 200);
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }
                    } else if (json.getString("command").equals("deleteWorkout")) {
                        String workout = json.getString("workouts");

                        try {
                            JSONArray workoutStatsLst = getWorkout(workout, exchange);
                            if (workoutStatsLst.length() == 0) {
                                sendResponse(exchange, "No Workout to delete", 405);
                            } else {
                                try {
                                    deleteWorkout(workout, exchange);
                                } catch (SQLException | IOException e) {
                                    sendResponse(exchange, e.getMessage(), 409);
                                    e.printStackTrace();
                                } 
                                sendResponse(exchange, "Workout deleted successfully", 200);
                            }
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }
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
                        String[] uri = exchange.getRequestURI().toString().split("/");
                        String command = uri[2];
                        

                    if (command.equals("getSplit")) {
                        String splitName = uri[3];
                        try {
                            JSONObject workoutLst = getSplit(splitName, exchange);

                            sendResponse(exchange, workoutLst.toString(), 200);
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }


                    } else if (command.equals("getWeek")) {
                        String week = uri[3];
                        try {
                            String splitName = getWeek(week, exchange);

                            sendResponse(exchange, splitName.toString(), 200);
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }
                    } else if (command.equals("getWorkout")) {
                        String workouts = uri[3];
                        try {
                            JSONArray workoutStatsLst = getWorkout(workouts, exchange);

                            sendResponse(exchange, workoutStatsLst.toString(), 200);
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }

                    } else if (command.equals("getWorkoutAll")) {
                        try {
                            JSONObject workoutStatsLst = getWorkoutAll(exchange);

                            sendResponse(exchange, workoutStatsLst.toString(), 200);
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }
                    } else if (command.equals("getSplitAll")) {
                        try {
                            JSONArray splitLst = getSplitAll(exchange);

                            sendResponse(exchange, splitLst.toString(), 200);
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }
                    } else if (command.equals("getWeekAll")) {
                        try {
                            JSONObject weekLst = getWeekAll(exchange);

                            sendResponse(exchange, weekLst.toString(), 200);
                        } catch (SQLException | IOException e) {
                            sendResponse(exchange, e.getMessage(), 409);
                            e.printStackTrace();
                        }
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
            // String path = "jdbc:sqlite:GymApp/sqlite/db/workoutDB.db";
            

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
                
                // String currentDir = System.getProperty("user.dir");
                // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

                con = DriverManager.getConnection(path);
            } catch (SQLException e) {
                System.out.println(e.getMessage());
                
                
            }
            return con;
        }

        public static void createNewTable() {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";
            // String path = "jdbc:sqlite:GymApp/sqlite/db/workoutDB.db";
            /*
             * table will hold all different workouts for user to pick from based on their name and then enter their weight, notes, etc. (shoulderPress, benchPress, etc.)
             * table2 will hold the name of the split along with a string containting all workouts for the day (shoulderPress,benchPress,...)
             * table3 will hold the weekly schedule based on weekday then the split for that day or restday
             */
            //String deleteTable = "DROP TABLE IF EXISTS splits;";

            String table = "CREATE TABLE IF NOT EXISTS workouts (\n"
                    + "   workout TEXT PRIMARY KEY,\n"
                    + "   weight INTEGER NOT NULL,\n"
                    + "   notes TEXT NOT NULL\n" +
                    ");";

            String table2 = "CREATE TABLE IF NOT EXISTS splits (\n"
            + "   splitName TEXT PRIMARY KEY,\n"
            + "   workoutLst TEXT NOT NULL,\n"
            + "   FOREIGN KEY (workoutLst) REFERENCES workoutLsts(workoutLst)\n" + 
            ");";

            String table3 = "CREATE TABLE IF NOT EXISTS schedule (\n"
            + "   weekday TEXT PRIMARY KEY,\n"
            + "   splitName TEXT NOT NULL,\n"
            + "   FOREIGN KEY (splitName) REFERENCES splits(splitName)\n" + 
            ");";

            String table4 = "CREATE TABLE IF NOT EXISTS workoutLsts (\n"
            + "   workoutLst TEXT PRIMARY KEY,\n"
            + "   workout1 TEXT,\n"
            + "   workout2 TEXT,\n"
            + "   workout3 TEXT,\n"
            + "   workout4 TEXT,\n"
            + "   workout5 TEXT,\n"
            + "   workout6 TEXT,\n"
            + "   workout7 TEXT,\n"
            + "   workout8 TEXT,\n"
            + "   workout9 TEXT,\n"
            + "   workout10 TEXT,\n"
            + "   FOREIGN KEY (workout1) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout2) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout3) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout4) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout5) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout6) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout7) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout8) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout9) REFERENCES workouts(workout)\n"
            + "   FOREIGN KEY (workout10) REFERENCES workouts(workout)\n" +
            ");";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(table);
                    pstmt.executeUpdate();

                    var pstmt2 = con.prepareStatement(table2);
                    pstmt2.executeUpdate();

                    var pstmt3 = con.prepareStatement(table3);
                    pstmt3.executeUpdate();

                    var pstmt4 = con.prepareStatement(table4);
                    pstmt4.executeUpdate();

                    System.out.println("Tables created");
                }
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }

        }

        public static void insertWorkout(String workout, int weight, String notes, HttpExchange exchange) throws SQLException, IOException { // inserts a workout/split/week into database based on given json
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";
            // String path = "jdbc:sqlite:GymApp/sqlite/db/workoutDB.db";

            String query = "INSERT INTO workouts(workout,weight,notes) VALUES(?,?,?)";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    pstmt.setString(1, workout);
                    pstmt.setInt(2, weight);
                    pstmt.setString(3, notes);
                    pstmt.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }

        }

        public static void updateWorkout(String workout, int weight, String notes, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "UPDATE workouts SET";
            
            if (weight != -1) {
                query += " weight = ?";
                if (notes != null) {query += " ,";}
            }

            if (notes != null) {
                query += " notes = ?";
            }
            query += " WHERE workout = ?";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    int i = 1;
                    if (weight != -1) {
                        pstmt.setInt(i, weight);
                        i++;
                    }
                    if (notes != null) {
                        pstmt.setString(i, notes);
                        i++;
                    }
                    pstmt.setString(i, workout);
                    pstmt.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
        }

        public static void deleteWorkout(String workout, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "DELETE FROM workouts WHERE workout = ?";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    pstmt.setString(1, workout);
                    pstmt.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
        }

        public static JSONArray getWorkout(String workout, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "SELECT weight, notes FROM workouts WHERE workout = ?";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    pstmt.setString(1, workout);
                    ResultSet resultSet = pstmt.executeQuery();
                    JSONArray workoutStatslst = new JSONArray();
                    if (resultSet.next()) {
                        workoutStatslst.put(0, resultSet.getInt("weight"));
                        workoutStatslst.put(1, resultSet.getString("notes"));
                    }
                    resultSet.close();
                    return workoutStatslst;
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
            return null;
        }
        public static JSONObject getWorkoutAll(HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "SELECT workout, weight, notes FROM workouts";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    ResultSet resultSet = pstmt.executeQuery();
                    // JSONArray workoutStatslst = new JSONArray();
                    JSONObject workoutLst = new JSONObject();

                    while (resultSet.next()) {
                        JSONArray workoutLstArray = new JSONArray();
                        workoutLstArray.put(0, resultSet.getInt("weight"));
                        workoutLstArray.put(1, resultSet.getString("notes"));
                        workoutLst.put(resultSet.getString("workout"), workoutLstArray);
                    }
                    resultSet.close();
                    return workoutLst;
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
            return null;
        }

        public static void insertSplit(String splitName, JSONArray workoutlst, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query1 = "INSERT INTO workoutLsts(workoutLst, workout1, workout2, workout3, workout4"
             + ", workout5, workout6, workout7, workout8, workout9, workout10) VALUES(?,?,?,?,?,?,?,?,?,?,?)";

            String query2 = "INSERT INTO splits(splitName, workoutLst) VALUES(?,?)";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt1 = con.prepareStatement(query1);
                    pstmt1.setString(1, splitName);

                    for (int i = 0; i < workoutlst.length(); i++) {
                        pstmt1.setString(i + 2, workoutlst.getString(i));
                    }
                    pstmt1.executeUpdate();

                    var pstmt2 = con.prepareStatement(query2);
                    pstmt2.setString(1, splitName);
                    pstmt2.setString(2, splitName);
                    pstmt2.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
        }

        public static void updateSplit(String splitName, JSONArray workoutlst, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "UPDATE workoutLsts SET workout1 = ?, workout2 = ?, workout3 = ?, workout4 = ?,"
            + " workout5 = ?, workout6 = ?, workout7 = ?, workout8 = ?, workout9 = ?, workout10 = ? WHERE workoutLst = ?";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    int i = 0;
                    while (i < 10) {
                        if (i + 1 > workoutlst.length()) {
                            pstmt.setNull(i + 1, i);
                        } else {
                            pstmt.setString(i + 1, workoutlst.getString(i));
                        }
                        i++;
                    }
                    pstmt.setString(i + 1, splitName);
                    pstmt.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
        }

        public static void deleteSplit(String splitName, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query1 = "DELETE FROM splits WHERE splitName = ?";

            String query2 = "DELETE FROM workoutLsts WHERE workoutLst = ?";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt1 = con.prepareStatement(query1);
                    var pstmt2 = con.prepareStatement(query2);

                    pstmt1.setString(1, splitName);
                    pstmt2.setString(1, splitName);

                    pstmt1.executeUpdate();
                    pstmt2.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
        }

        public static JSONObject getSplit(String splitName, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "SELECT workout1, workout2, workout3, workout4, workout5,"
            + " workout6, workout7, workout8, workout9, workout10 FROM workoutLsts WHERE workoutLst = ?";


            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    pstmt.setString(1, splitName);
                    ResultSet resultSet = pstmt.executeQuery();

                    JSONArray workoutLst = new JSONArray();
                    int i = 1;
                    if (resultSet.next()) {
                        while (i < 11) {
                            if (resultSet.getString("workout" + i) != null) {
                                workoutLst.put(i - 1, resultSet.getString("workout" + i));
                            } else {
                                break;
                            }
                            i++;
                        }
                    }
                    resultSet.close();
                    JSONObject splitList = new JSONObject();
                    for (int j = 0; j < workoutLst.length(); j++) {
                        String workout = (String) workoutLst.get(j);
                        JSONArray splitStats = getWorkout(workout, exchange);
                        splitList.put(workout, splitStats);
                    }
                    return splitList;
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
            return null;
        }

        public static JSONArray getSplitAll(HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "SELECT splitName FROM splits";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    ResultSet resultSet = pstmt.executeQuery();
                    // JSONArray workoutStatslst = new JSONArray();
                    JSONArray splitLst = new JSONArray();

                    while (resultSet.next()) {
                        splitLst.put(resultSet.getString("splitName"));
                    }
                    resultSet.close();
                    return splitLst;
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
            return null;
        }


        public static void insertWeek(String weekday, String splitName, HttpExchange exchange) throws SQLException, IOException { // inserts a workout/split/week into database based on given json
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "INSERT INTO schedule(weekday,splitName) VALUES(?,?)";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    pstmt.setString(1, weekday);
                    pstmt.setString(2, splitName);
                    pstmt.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }

        }

        public static void updateWeek(String weekday, String splitName, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "UPDATE schedule SET splitName = ? WHERE weekday = ?";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    pstmt.setString(1, splitName);
                    pstmt.setString(2, weekday);

                    pstmt.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
        }

        public static void deleteWeek(String weekday, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "DELETE FROM schedule WHERE weekday = ?";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    pstmt.setString(1, weekday);
                    pstmt.executeUpdate();
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
        }

        public static String getWeek(String weekday, HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "SELECT splitName FROM schedule WHERE weekday = ?";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    pstmt.setString(1, weekday);
                    ResultSet resultSet = pstmt.executeQuery();
                    String splitName = "";
                    if (resultSet.next()) {
                        splitName = resultSet.getString("splitName");
                    }
                    resultSet.close();
                    return splitName;
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
            return null;
        }

        public static JSONObject getWeekAll(HttpExchange exchange) throws SQLException, IOException {
            // String currentDir = System.getProperty("user.dir");
            // String path = "jdbc:sqlite:" + currentDir + "/sqlite/db/workoutDB.db";

            String query = "SELECT * FROM schedule";

            try (Connection con = DriverManager.getConnection(path)) {
                if (con != null) {
                    var pstmt = con.prepareStatement(query);
                    
                    ResultSet resultSet = pstmt.executeQuery();
                    JSONObject weekLst = new JSONObject();
                    while (resultSet.next()) {
                        weekLst.put(resultSet.getString("weekday"), resultSet.getString("splitName"));

                    }
                    resultSet.close();
                    return weekLst;
                }
            } catch (SQLException e) {
                sendResponse(exchange, e.getMessage(), 409);
                System.out.println(e.getMessage());
            }
            return null;
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

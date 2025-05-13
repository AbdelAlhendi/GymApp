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

import java.util.concurrent.Executors;

import javax.swing.plaf.synth.SynthEditorPaneUI;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import org.json.JSONObject;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


public class API {

    public static void main(String[] args) throws IOException {
        int port = 8080;
        // System.out.println("Server started on port " + port);

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.setExecutor(Executors.newFixedThreadPool(20)); 

        server.createContext("/workout", new WorkoutHandler());
        server.createContext("/workout/", new WorkoutHandler());

        server.createContext("/diet", new WorkoutHandler());
        server.createContext("/diet/", new WorkoutHandler());
        

        server.setExecutor(null);

        server.start();

        System.out.println("Server started on port " + port);

    }


        static class WorkoutHandler implements HttpHandler {
            public void handle (HttpExchange exchange) throws IOException {
                if ("OPTIONS".equals(exchange.getRequestMethod())) {
                    exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                    exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                    exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Authorization, Content-Type");
                    exchange.sendResponseHeaders(204, -1); // 204 No Content
                    exchange.close();
                    return;
                }
                if ("POST".equals(exchange.getRequestMethod())) {
                    JSONObject workout = new JSONObject(getRequestBody(exchange));

                    HttpClient client = HttpClient.newHttpClient();
                    String workoutIp = "127.0.0.1";
                    int workoutPort = 8082;


                    HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("http://" + workoutIp + ":" + workoutPort + "/workout"))
                        .POST((HttpRequest.BodyPublishers.ofString(workout.toString())))
                        .build();

                    try {
                        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                        if (response.statusCode() == 200) {
                            // do something depending on status code
                            // String responseStr = "Valid Post Request";

                            sendResponse(exchange, response.body(), response.statusCode());
                        } else {
                            sendResponse(exchange, response.body(), response.statusCode());
                        }
                            
                        // } else if (response.statusCode() == 400) { // Bad Request
                        //     String responseStr = "Invalid Fields";
                        //     sendResponse(exchange, responseStr, response.statusCode());


                        // } else if (response.statusCode() == 404) { // User not found
                        //     String responseStr = "User does not exist";
                        //     sendResponse(exchange, responseStr, response.statusCode());

                        // } else { // else 
                        //     #String responseStr = "Server error, please try again.";
                        //     sendResponse(exchange, responseStr, response.statusCode());
                        // }
                    } catch (InterruptedException e) {
                        System.out.println(e);
                    }

                } else if ("GET".equals(exchange.getRequestMethod())) {
                    //System.out.println("1");
                    String command = "";
                    String workout = "";
                    String[] uriReceive = exchange.getRequestURI().toString().split("/");
                    System.out.println(uriReceive);
                    command = uriReceive[2];
                    if (uriReceive.length >= 4) {
                        

                        // System.out.println(command);
                        // JSONObject workout = new JSONObject(getRequestBody(exchange));
                        workout = uriReceive[3];
                        System.out.println(workout + "    " + command);
                    }


                    HttpClient client = HttpClient.newHttpClient();
                    String workoutIp = "127.0.0.1";
                    int workoutPort = 8082;
                    // const url = "http://127.0.0.1:8080/workout/getWorkout/shoulderPress"


                    // String jsonCommand = workout.getString("command");
                    String uri = "http://" + workoutIp + ":" + workoutPort + "/workout/" + command + "/";

                    
                    uri += workout;
                    // System.out.println(uri);

                    // if (command.equals("getSplit")) {
                    //     uri += workout.getString("splitName");
                    // } else if (command.equals("getWeek")) {
                    //     uri += workout.getString("week");
                    // } else if (command.equals("getWorkout")) {
                    //     uri += workout.getString("workouts");
                    // } else {
                    //     sendResponse(exchange, "Invalid Fields", 400);
                    // }
                    


                    HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(uri))
                        .GET()
                        .build();

                    try {
                        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                        if (response.statusCode() == 200) {
                            // do something depending on status code
                            // String responseStr = "Valid Post Request";
                            System.out.println(response.body());
                            sendResponse(exchange, response.body(), response.statusCode());
                        } else {
                            sendResponse(exchange, response.body(), response.statusCode());
                        }
                            
                        // } else if (response.statusCode() == 400) { // Bad Request
                        //     String responseStr = "Invalid Fields";
                        //     sendResponse(exchange, responseStr, response.statusCode());


                        // } else if (response.statusCode() == 404) { // User not found
                        //     String responseStr = "User does not exist";
                        //     sendResponse(exchange, responseStr, response.statusCode());

                        // } else { // else 
                        //     #String responseStr = "Server error, please try again.";
                        //     sendResponse(exchange, responseStr, response.statusCode());
                        // }
                    } catch (InterruptedException e) {
                        System.out.println(e);
                    }
                } else {
                    sendResponse(exchange, "Unknown request", 405);
                }
            }
        }

        static class DietHandler implements HttpHandler {
            public void handle (HttpExchange exchange) throws IOException {
                if ("POST".equals(exchange.getRequestMethod())) {
                    JSONObject diet = new JSONObject(getRequestBody(exchange));

                    HttpClient client = HttpClient.newHttpClient();
                    String dietIp = "127.0.0.1";
                    int dietPort = 8082;


                    HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("http://" + dietIp + ":" + dietPort + "/diet"))
                        .POST((HttpRequest.BodyPublishers.ofString(diet.toString())))
                        .build();

                    try {
                        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                        if (response.statusCode() == 200) {
                            // do something depending on status code
                            String responseStr = "Valid Post Request";

                            sendResponse(exchange, responseStr, response.statusCode());
                            
                        } else if (response.statusCode() == 400) { // Bad Request
                            String responseStr = "Invalid Fields";
                            sendResponse(exchange, responseStr, response.statusCode());


                        } else if (response.statusCode() == 404) { // User not found
                            String responseStr = "User does not exist";
                            sendResponse(exchange, responseStr, response.statusCode());

                        } else { // else 
                            String responseStr = "Server error, please try again.";
                            sendResponse(exchange, responseStr, response.statusCode());
                        }
                        } catch (InterruptedException e) {
                            System.out.println(e);
                        }
                } else if ("GET".equals(exchange.getRequestMethod())) {

                } else {
                    sendResponse(exchange, "Unknown request", 405);
                }
            }
        }


        static class UserHandler implements HttpHandler {
        
            public void handle (HttpExchange exchange) throws IOException {
                // if ("OPTIONS".equals(exchange.getRequestMethod())) {
                //     exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                //     exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                //     exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Authorization, Content-Type");
                //     exchange.sendResponseHeaders(204, -1); // 204 No Content
                //     exchange.close();
                //     return;
                // }
                // else 
                if ("POST".equals(exchange.getRequestMethod())) {
                    try {
                        
                        JSONObject user = new JSONObject(getRequestBody(exchange));

                        HttpClient client = HttpClient.newHttpClient();

                        String userIp = "127.0.0.1";

                        int userPort = 8081;

                        HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("http://" + userIp + ":" + userPort + "/users"))
                        .header("Authorization",exchange.getRequestHeaders().get("Authorization").get(0)) // may need to remove authoriazation part
                        .POST((HttpRequest.BodyPublishers.ofString(user.toString())))
                        .build();

                        try {
                            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                            // System.out.println(response.headers().map().get("Authorization"));
                            // exchange.getResponseHeaders().add("Authorization", response.headers().map().get("authorization").toString());
                            if (response.statusCode() == 200) {
                                // do something depending on status code
                                String responseStr = "Valid Post Request";

                                sendResponse(exchange, responseStr, response.statusCode());
                                
                            } else if (response.statusCode() == 400) { // Bad Request
                                String responseStr = "Invalid Fields";
                                sendResponse(exchange, responseStr, response.statusCode());


                            } else if (response.statusCode() == 404) { // User not found
                                String responseStr = "User does not exist";
                                sendResponse(exchange, responseStr, response.statusCode());

                            } else { // else 
                                String responseStr = "Server error, please try again.";
                                sendResponse(exchange, responseStr, response.statusCode());
                            }
                        } catch (InterruptedException e) {
                            System.out.println(e);
                        }
                    } catch (Exception e) {
                        System.out.println(e);
                        sendResponse(exchange, "ERROR", 500);
                    }

                } else if ("GET".equals(exchange.getRequestMethod())) {
                    // System.out.println("yuh");

                    // JSONObject map = new JSONObject(getRequestBody(exchange));

                    try {

                        String url = exchange.getRequestURI().toString();
                        String[] spliturl = url.split("/");
                        String[] fieldItem = spliturl[spliturl.length -1].split(":");

                        String first = "";
                        String second = "";
                        if (!fieldItem[0].equals("login") && !fieldItem[0].equals("display") && !fieldItem[0].equals("get")&& !fieldItem[0].equals("chatlogs")) {
                            sendResponse(exchange, "Invalid fields", 400);
                        } else if (fieldItem[1].equals("")) {
                            sendResponse(exchange, "Invalid fields", 400);

                        } else {
                            if (fieldItem[0].equals("login")) {
                                first = fieldItem[1] + ":";
                                second = fieldItem[2];
                            } else if (fieldItem[0].equals("display")) {
                                first = fieldItem[1];
                            } else if (fieldItem[0].equals("get")) {
                                first = fieldItem[1];
                                // second = fieldItem[2];
                            } else if (fieldItem[0].equals("chatlogs")) {
                                first = fieldItem[1];
                            }


                            HttpClient client = HttpClient.newHttpClient();
                            
                            String userIp = "127.0.0.1";
                            int userPort = 8081;
                            HttpRequest request = HttpRequest.newBuilder()
                            .uri(URI.create("http://" + userIp + ":" + userPort + "/users/" + fieldItem[0] + ":" + first + second))
                            .header("Authorization",exchange.getRequestHeaders().get("Authorization").get(0)) // may need to remove authoriazation part
                            .GET()
                            .build();

                            try {
                                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                                if(response.headers().map().get("Authorization") != null)
                                exchange.getResponseHeaders().add("Authorization", response.headers().map().get("Authorization").get(0)); // may need to remove authoriazation part

                                if (response.statusCode() == 200) {
                                    // do something depending on status code
                                    System.out.println("Valid Get Request");
                                    System.out.println(response.body());
                                    sendResponse(exchange, response.body(), response.statusCode());
                                    
                                } else if (response.statusCode() == 400) { // Bad Request
                                    String responseStr = "Invalid Fields";
                                    sendResponse(exchange, responseStr, response.statusCode());


                                } else if (response.statusCode() == 404) { // User not found
                                    String responseStr = "User does not exist";
                                    sendResponse(exchange, responseStr, response.statusCode());

                                } else { // else 
                                    String responseStr = "Server error, please try again.";
                                    sendResponse(exchange, responseStr, response.statusCode());
                                }

                            } catch (InterruptedException e) {
                                System.out.println(e);
                            }
                        }
                    } catch (Exception e) {
                        System.out.println(e);
                        sendResponse(exchange, "ERROR", 400);
                    }

                    
                } else {
                    sendResponse(exchange, "Unknown request", 405);
                }

            }

        }

        static class TaskHandler implements HttpHandler {
        
            public void handle (HttpExchange exchange) throws IOException {
                if ("OPTIONS".equals(exchange.getRequestMethod())) {
                    exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                    exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                    exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Authorization, Content-Type");
                    exchange.sendResponseHeaders(204, -1); // 204 No Content
                    exchange.close();
                    return;
                }
                else if ("POST".equals(exchange.getRequestMethod())) {
                    System.out.println("post requests");
                    // System.out.println("yuh");
                    try {
                        // for now I removed these checks as they were too restrictive for certain commands, will readd them later.
                        JSONObject task = new JSONObject(getRequestBody(exchange));
                        // if ((task.getString("command").equals("POST") && ((task.getString("title").equals("")) ||
                        // (task.getString("position").equals("")) ||
                        // (task.getJSONObject("poster")) == null||
                        // // (task.getString("taskId").equals("")) ||
                        // (task.getString("startTime").equals("")) ||
                        // (task.getString("endTime").equals("")) ||
                        // (task.getString("status").equals("")) ||
                        // (task.getString("credit").equals("")))) {
                        //     System.out.println("Invalid fields");
                        //     sendResponse(exchange, "Invalid fields", 400);

                        // } else {

                            // System.out.println(task);

                            HttpClient client = HttpClient.newHttpClient();

                            String taskIp = "127.0.0.1";

                            int taskPort = 8082;
                            

                            HttpRequest request = HttpRequest.newBuilder()
                            .uri(URI.create("http://" + taskIp + ":" + taskPort + "/task"))
                            .header("Authorization",exchange.getRequestHeaders().get("Authorization").get(0)) // may need to remove authoriazation part
                            .POST((HttpRequest.BodyPublishers.ofString(task.toString())))
                            .build();

                            try {
                                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                                if (response.statusCode() == 200) {
                                    // do something depending on status code
                                    // System.out.println("WORKS");
                                    String responseStr = response.body();
                                    sendResponse(exchange, responseStr, response.statusCode());
                                    
                                } else if (response.statusCode() == 400) { // Bad Request
                                    String responseStr = "Invalid Fields";
                                    sendResponse(exchange, responseStr, response.statusCode());


                                } else if (response.statusCode() == 404) { // User not found
                                    String responseStr = "User does not exist";
                                    sendResponse(exchange, responseStr, response.statusCode());

                                } else { // else 
                                    String responseStr = "Server error, please try again.";
                                    sendResponse(exchange, responseStr, response.statusCode());
                                }

                            } catch (InterruptedException e) {
                                System.out.println(e);
                            }
                        // }
                    } catch (Exception e) {
                        System.out.println(e);
                        sendResponse(exchange,"ERROR", 400);
                    }

                } else if ("GET".equals(exchange.getRequestMethod())) {
                    // System.out.println("yuh");

                    // JSONObject map = new JSONObject(getRequestBody(exchange));
                    try {

                        String url = exchange.getRequestURI().toString();
                        String[] spliturl = url.split("/");
                        String[] fieldItem = spliturl[spliturl.length -1].split(":");
                        String field = fieldItem[0];
                        String item = fieldItem[1];
                        if (field.equals("")) {
                            sendResponse(exchange, "Invalid fields", 400);
                        } else {

                            // System.out.println(field);
                            // System.out.println(item);

                            HttpClient client = HttpClient.newHttpClient();
                            
                            String taskIp = "127.0.0.1";

                            int taskPort = 8082;
    
                            HttpRequest request = HttpRequest.newBuilder()
                            .uri(URI.create("http://" + taskIp + ":" + taskPort + "/task/" + field + ":" + item))
                            .header("Authorization",exchange.getRequestHeaders().get("Authorization").get(0)) // may need to remove authoriazation part
                            .GET()
                            .build();

                            System.out.println(request.headers());

                            try {
                                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                                if (response.statusCode() == 200) {
                                    // do something depending on status code
                                    System.out.println("Valid Get Request");

                                    sendResponse(exchange, response.body(), response.statusCode());
                                    
                                } else if (response.statusCode() == 400) { // Bad Request
                                    String responseStr = "Invalid Fields";
                                    sendResponse(exchange, responseStr, response.statusCode());


                                } else if (response.statusCode() == 404) { // User not found
                                    String responseStr = "User does not exist";
                                    sendResponse(exchange, responseStr, response.statusCode());

                                } else { // else 
                                    String responseStr = "Server error, please try again.";
                                    sendResponse(exchange, responseStr, response.statusCode());
                                }

                            } catch (InterruptedException e) {
                                System.out.println(e);
                            }
                        }
                    } catch (Exception e) {
                        sendResponse(exchange, "ERROR", 400);
                    }

                    
                } else {
                    sendResponse(exchange, "Unknown request", 405);
                }

            }

        }

    // public class CorsConfig {
        
    //     public WebMvcConfigurer corsConfigurer() {
    //         return new WebMvcConfigurer() {
    //             @Override
    //             public void addCorsMappings(CorsRegistry registry) {
    //                 registry.addMapping("/**")
    //                         .allowedOrigins("http://localhost:8081")
    //                         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    //             }
    //         };
    //     }
    // }

        // static class ChatHandler implements HttpHandler {
        
        //     public void handle (HttpExchange exchange) throws IOException {
        //         if ("POST".equals(exchange.getRequestMethod())) {
        //             System.out.println("yuh");

        //             JSONObject map = new JSONObject(getRequestBody(exchange));

        //             HttpClient client = HttpClient.newHttpClient();

        //             String chatIp = "127.0.0.1";

        //             int chatPort = 8003;

        //             HttpRequest request = HttpRequest.newBuilder()
        //             .uri(URI.create("http://" + chatIp + ":" + chatPort + "/chat"))
        //             .headers("Content-Type", "application/json")
        //             .POST((HttpRequest.BodyPublishers.ofString(map.toString())))
        //             .build();

        //             try {
        //                 HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        //                 if (response.statusCode() == 200) {
        //                     // do something depending on status code
        //                     String responseStr = "Valid Post Request";
        //                     sendResponse(exchange, responseStr, response.statusCode());
                            
        //                 } else if (response.statusCode() == 400) { // Bad Request
        //                     String responseStr = "Invalid Fields";
        //                     sendResponse(exchange, responseStr, response.statusCode());


        //                 } else if (response.statusCode() == 404) { // User not found
        //                     String responseStr = "User does not exist";
        //                     sendResponse(exchange, responseStr, response.statusCode());

        //                 } else { // else 
        //                     String responseStr = "Server error, please try again.";
        //                     sendResponse(exchange, responseStr, response.statusCode());
        //                 }

        //             } catch (InterruptedException e) {
        //                 System.out.println(e);
        //             }

        //         } else if ("GET".equals(exchange.getRequestMethod())) {
        //             System.out.println("yuh");

        //             // JSONObject map = new JSONObject(getRequestBody(exchange));

        //             HttpClient client = HttpClient.newHttpClient();
                    
        //             String chatIp = "127.0.0.1";

        //             int chatPort = 8003;

        //             HttpRequest request = HttpRequest.newBuilder()
        //             .uri(URI.create("http://" + chatIp + ":" + chatPort + "/chat/"))
        //             .headers("Content-Type", "application/json")
        //             .GET()
        //             .build();

        //             try {
        //                 HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        //                 if (response.statusCode() == 200) {
        //                     // do something depending on status code
        //                     System.out.println("Valid Get Request");
        //                     sendResponse(exchange, response.body(), response.statusCode());
                            
        //                 } else if (response.statusCode() == 400) { // Bad Request
        //                     String responseStr = "Invalid Fields";
        //                     sendResponse(exchange, responseStr, response.statusCode());


        //                 } else if (response.statusCode() == 404) { // User not found
        //                     String responseStr = "User does not exist";
        //                     sendResponse(exchange, responseStr, response.statusCode());

        //                 } else { // else 
        //                     String responseStr = "Server error, please try again.";
        //                     sendResponse(exchange, responseStr, response.statusCode());
        //                 }

        //             } catch (InterruptedException e) {
        //                 System.out.println(e);
        //             }

                    
        //         } else {
        //             sendResponse(exchange, "Unknown request", 405);
        //         }

        //     }

        // }




        private static String getRequestBody(HttpExchange exchange) throws IOException {
        try (BufferedReader br = new BufferedReader(new
                InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8))) {
            StringBuilder requestBody = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) {
                requestBody.append(line);
            }
            return requestBody.toString();
        }
    }


    private static void sendResponse(HttpExchange exchange, String response, int statusCode) throws IOException {
        exchange.sendResponseHeaders(statusCode, response.length());
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes(StandardCharsets.UTF_8));
        os.close();
    }


}
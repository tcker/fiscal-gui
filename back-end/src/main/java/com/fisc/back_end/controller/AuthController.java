package com.fisc.back_end.controller;

import com.fisc.back_end.service.FirebaseService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5137")  // Allow cross-origin requests from your frontend
public class AuthController {

    @Autowired
    private FirebaseService firebaseService;

    // Existing login endpoint using FirebaseService to verify ID token
    @PostMapping("/api/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String idToken = loginRequest.getIdToken();

        try {
            // Verify the Firebase ID token using FirebaseService
            FirebaseToken decodedToken = firebaseService.verifyIdToken(idToken);

            // If the email from the ID token matches the email sent from the client
            if (decodedToken.getEmail() != null && decodedToken.getEmail().equals(email)) {
                return new ResponseEntity<>(new ApiResponse("Login successful!", true), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ApiResponse("Invalid email or token.", false), HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse("Error during authentication: " + e.getMessage(), false), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Sign-up endpoint to create a new user in Firebase Authentication
    @PostMapping("/api/signup")
    public ResponseEntity<ApiResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        String email = signUpRequest.getEmail();
        String password = signUpRequest.getPassword();
    
        try {
            System.out.println("Received sign-up request for email: " + email);
            
            if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
                return new ResponseEntity<>(new ApiResponse("Email and password must not be empty", false), HttpStatus.BAD_REQUEST);
            }
    
            UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                    .setEmail(email)
                    .setPassword(password);
            System.out.println("Creating user in Firebase...");
            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
            System.out.println("User created successfully with UID: " + userRecord.getUid());
    
            String firebaseToken = FirebaseAuth.getInstance().createCustomToken(userRecord.getUid());
    
            ApiResponse response = new ApiResponse("User created successfully!", true, firebaseToken);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log the exception stack trace
            e.printStackTrace();
            return new ResponseEntity<>(new ApiResponse("Email already been used", false), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // API response model class for cleaner response structure
    public static class ApiResponse {
        private String message;
        private boolean success;
        private String token;

        // Constructor for ApiResponse
        public ApiResponse(String message, boolean success) {
            this.message = message;
            this.success = success;
            this.token = null;
        }

        // Constructor for ApiResponse including token
        public ApiResponse(String message, boolean success, String token) {
            this.message = message;
            this.success = success;
            this.token = token;
        }

        // Getters and setters
        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }

    // LoginRequest class to capture the incoming request data for login
    public static class LoginRequest {
        private String email;
        private String idToken;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getIdToken() {
            return idToken;
        }

        public void setIdToken(String idToken) {
            this.idToken = idToken;
        }
    }

    // SignUpRequest class to capture the incoming request data for sign-up
    public static class SignUpRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}

package com.fisc.back_end.controller;

import com.fisc.back_end.service.FirebaseService;
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
@CrossOrigin(origins = "http://localhost:5137")
public class AuthController {

    @Autowired
    private FirebaseService firebaseService;

    @PostMapping("/api/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        AuthHandler handler = new LoginHandler(firebaseService, loginRequest);
        return handler.handleRequest();
    }

    @PostMapping("/api/signup")
    public ResponseEntity<ApiResponse> signUp(@RequestBody SignUpRequest signUpRequest) {
        AuthHandler handler = new SignUpHandler(firebaseService, signUpRequest);
        return handler.handleRequest();
    }

    // Abstract Base Class for Auth Handlers
    abstract static class AuthHandler {
        protected final FirebaseService firebaseService;

        public AuthHandler(FirebaseService firebaseService) {
            this.firebaseService = firebaseService;
        }

        public abstract ResponseEntity<ApiResponse> handleRequest();
    }

    // Login Handler (inherits from AuthHandler)
    static class LoginHandler extends AuthHandler {
        private final LoginRequest loginRequest;

        public LoginHandler(FirebaseService firebaseService, LoginRequest loginRequest) {
            super(firebaseService);
            this.loginRequest = loginRequest;
        }

        @Override
        public ResponseEntity<ApiResponse> handleRequest() {
            String email = loginRequest.getEmail();
            String idToken = loginRequest.getIdToken();

            try {
                FirebaseToken decodedToken = firebaseService.verifyIdToken(idToken);
                if (decodedToken.getEmail() != null && decodedToken.getEmail().equals(email)) {
                    return new ResponseEntity<>(new ApiResponse("Login successful!", true), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(new ApiResponse("Invalid email or token.", false), HttpStatus.BAD_REQUEST);
                }
            } catch (Exception e) {
                return new ResponseEntity<>(new ApiResponse("Error during authentication: " + e.getMessage(), false), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    // Sign-Up Handler (inherits from AuthHandler)
    static class SignUpHandler extends AuthHandler {
        private final SignUpRequest signUpRequest;

        public SignUpHandler(FirebaseService firebaseService, SignUpRequest signUpRequest) {
            super(firebaseService);
            this.signUpRequest = signUpRequest;
        }

        @Override
        public ResponseEntity<ApiResponse> handleRequest() {
            String email = signUpRequest.getEmail();
            String password = signUpRequest.getPassword();

            try {
                if (email == null || password == null || email.isEmpty() || password.isEmpty()) {
                    return new ResponseEntity<>(new ApiResponse("Email and password must not be empty", false), HttpStatus.BAD_REQUEST);
                }

                UserRecord userRecord = firebaseService.createUser(email, password);
                String firebaseToken = firebaseService.generateCustomToken(userRecord.getUid());

                ApiResponse response = new ApiResponse("User created successfully!", true, firebaseToken);
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(new ApiResponse("Error creating user: " + e.getMessage(), false), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    // API response model class
    public static class ApiResponse {
        private String message;
        private boolean success;
        private String token;

        public ApiResponse(String message, boolean success) {
            this.message = message;
            this.success = success;
            this.token = null;
        }

        public ApiResponse(String message, boolean success, String token) {
            this.message = message;
            this.success = success;
            this.token = token;
        }

        public String getMessage() {
            return message;
        }

        public boolean isSuccess() {
            return success;
        }

        public String getToken() {
            return token;
        }
    }

    // LoginRequest class
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

    // SignUpRequest class
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
    
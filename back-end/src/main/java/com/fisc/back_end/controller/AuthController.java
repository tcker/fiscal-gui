package com.fisc.back_end.controller;

import com.fisc.back_end.service.FirebaseService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5137")
public class AuthController {

    @Autowired
    private FirebaseService firebaseService;

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String idToken = credentials.get("idToken");

        try {
            // Call FirebaseService to verify the ID token
            FirebaseToken decodedToken = firebaseService.verifyIdToken(idToken);

            // If the email from the ID token matches the email sent from the client
            if (decodedToken.getEmail() != null && decodedToken.getEmail().equals(email)) {
                return new ResponseEntity<>("{\"message\":\"Login successful!\"}", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("{\"message\":\"Invalid email or token.\"}", HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            return new ResponseEntity<>("{\"message\":\"Error during authentication: " + e.getMessage() + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

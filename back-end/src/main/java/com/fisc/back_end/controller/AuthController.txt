package com.fisc.back_end.controller;

import com.google.firebase.auth.FirebaseToken;
import com.fisc.back_end.service.FirebaseService; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5137")
public class AuthController {

    @Autowired
    private FirebaseService firebaseService;  // This will now work with FirebaseService class

    @PostMapping("/api/login")
    public String login(@RequestBody String idToken) {
        try {
            FirebaseToken decodedToken = firebaseService.authenticate(idToken);
            return "Login successful! User ID: " + decodedToken.getUid();
        } catch (Exception e) {
            return "Error during authentication: " + e.getMessage();
        }
    }
}
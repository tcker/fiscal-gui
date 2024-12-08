package com.fisc.back_end.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Service;

@Service
public class FirebaseService {

    // Method to authenticate the ID token
    public FirebaseToken authenticate(String idToken) throws Exception {
        // Verify the ID token with Firebase Authentication
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }
}
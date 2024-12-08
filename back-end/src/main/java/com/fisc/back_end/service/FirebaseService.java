package com.fisc.back_end.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.springframework.stereotype.Service;

@Service
public class FirebaseService {

    public FirebaseToken verifyIdToken(String idToken) throws Exception {
        // Verify the Firebase ID token and return the decoded token
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }

    public UserRecord createUser(String email, String password) throws Exception {
        // Create a new user in Firebase Authentication with the provided email and password
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(email)
                .setPassword(password);
        return FirebaseAuth.getInstance().createUser(request);
    }
}

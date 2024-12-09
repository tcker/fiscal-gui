package com.fisc.back_end.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class FirebaseService {

    private Firestore firestore = FirestoreClient.getFirestore();

    public FirebaseToken verifyIdToken(String idToken) throws Exception {
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }

    public String generateCustomToken(String uid) throws Exception {
        return FirebaseAuth.getInstance().createCustomToken(uid);
    }

    public UserRecord createUser(String email, String password) throws Exception {
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(email)
                .setPassword(password);
        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        // Save user to Firestore
        DocumentReference userRef = firestore.collection("users").document(userRecord.getUid());
        Map<String, Object> userData = new HashMap<>();
        userData.put("email", email);
        userData.put("uid", userRecord.getUid());
        userRef.set(userData);

        return userRecord;
    }
}

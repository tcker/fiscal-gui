package com.example.backend;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;

public class FirebaseService {

    public Firestore getFirestoreInstance() {
        FirestoreOptions firestoreOptions = FirestoreOptions.getDefaultInstance();
        return firestoreOptions.getService();
    }
}
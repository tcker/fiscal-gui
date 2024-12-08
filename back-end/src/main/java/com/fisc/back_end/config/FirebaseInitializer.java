package com.fisc.back_end.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Component
public class FirebaseInitializer {

    @PostConstruct
    public void initialize() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("src/main/resources/serviceAccountKey.json");

        // Get the GoogleCredentials from the service account
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

        // Initialize Firebase with the credentials
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(credentials)
                .build();

        // Initialize Firebase App
        if (FirebaseApp.getApps().isEmpty()) {  // Check if Firebase App has been initialized
            FirebaseApp.initializeApp(options);
        }
    }
}
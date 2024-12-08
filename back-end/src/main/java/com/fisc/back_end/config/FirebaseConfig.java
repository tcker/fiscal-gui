package com.fisc.back_end.config;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.service-account.path}")
    private String serviceAccountPath;  // Path to the Firebase service account JSON file

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Load the service account credentials from the resource path
        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream(serviceAccountPath);

        if (serviceAccount == null) {
            throw new IOException("Service account file not found at " + serviceAccountPath);
        }

        // Initialize Firebase with the service account credentials
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        return FirebaseApp.initializeApp(options);  // Initialize Firebase
    }
}

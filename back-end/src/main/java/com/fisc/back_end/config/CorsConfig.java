package com.fisc.back_end.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Update the allowed origin to match your React app's URL
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")  // Allow React app running on port 5173
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow specific HTTP methods
                .allowedHeaders("*")  // Allow all headers (or specify custom headers if needed)
                .allowCredentials(true);  // Allow credentials like cookies or tokens
    }
}

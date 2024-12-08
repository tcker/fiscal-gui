package com.fisc.back_end.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendController {

    @GetMapping("/")
    public String home() {
        // Return some backend response (e.g., a simple text response)
        return "Backend is up and running!";
    }

    // You can also create more endpoints for other backend operations
    @GetMapping("/api/status")
    public String status() {
        return "API is running.";
    }
}
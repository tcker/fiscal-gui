package com.fisc.back_end.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendController {

    @GetMapping("/")
    public String home() {
        return "Backend is up and running!";
    }

    @GetMapping("/api/status")
    public String status() {
        return "API is running.";
    }
}
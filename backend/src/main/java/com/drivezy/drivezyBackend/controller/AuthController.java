package com.drivezy.drivezyBackend.controller;

import com.drivezy.drivezyBackend.dto.*;
import com.drivezy.drivezyBackend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired private AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
        authService.register(req);
        return new AuthResponse("User registered successfully");
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        String token = authService.login(req);
        return new AuthResponse(token);
    }
}

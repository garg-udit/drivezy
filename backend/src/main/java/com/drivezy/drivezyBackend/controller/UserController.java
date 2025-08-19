package com.drivezy.drivezyBackend.controller;

import com.drivezy.drivezyBackend.dto.AuthResponse;
import com.drivezy.drivezyBackend.dto.ChangePasswordRequest;
import com.drivezy.drivezyBackend.dto.ProviderRegisterRequest;
import com.drivezy.drivezyBackend.dto.UpdateProfileRequest;
import com.drivezy.drivezyBackend.dto.UserProfileResponse;
import com.drivezy.drivezyBackend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired private UserService userService;

    @GetMapping("/me")
    public UserProfileResponse getMyProfile() {
        return userService.getMyProfile();
    }
    
    @PostMapping("/company/{companyId}/add-provider")
    public AuthResponse addProvider(@PathVariable Long companyId,
                                    @Valid @RequestBody ProviderRegisterRequest req) {
        userService.addProvider(companyId, req);
        return new AuthResponse("Provider registered successfully");
    }
    
    @PostMapping("/change-password")
    public AuthResponse changePassword(@AuthenticationPrincipal UserDetails userDetails,
                                       @Valid @RequestBody ChangePasswordRequest req) {
        userService.changePassword(userDetails.getUsername(), req);
        return new AuthResponse("Password changed successfully");
    }

    @PutMapping("/update-profile")
    public AuthResponse updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                      @Valid @RequestBody UpdateProfileRequest req) {
        userService.updateProfile(userDetails.getUsername(), req);
        return new AuthResponse("Profile updated successfully");
    }
}


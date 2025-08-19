


package com.drivezy.drivezyBackend.controller;

import com.drivezy.drivezyBackend.dto.UserProfileResponse;
import com.drivezy.drivezyBackend.enums.UserRole;
import com.drivezy.drivezyBackend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private AdminService adminService;

    @PostMapping("/verify-company/{companyId}")
    public ResponseEntity<String> verifyCompany(@PathVariable Long companyId) {
        adminService.verifyCompany(companyId);
        return ResponseEntity.ok("Company verified successfully");
    }

    @PostMapping("/verify-user/{userId}")
    public ResponseEntity<String> verifyUser(@PathVariable Long userId) {
        adminService.verifyUser(userId);
        return ResponseEntity.ok("User verified successfully");
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserProfileResponse>> getUsersByRoleAndVerified(
            @RequestParam UserRole role,
            @RequestParam boolean verified,
            @RequestParam(required = false) String query
    ) {
        return ResponseEntity.ok(adminService.getUsersByRoleVerifiedAndQuery(role, verified, query));
    }
}

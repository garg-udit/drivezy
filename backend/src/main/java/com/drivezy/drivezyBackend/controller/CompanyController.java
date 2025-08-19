package com.drivezy.drivezyBackend.controller;

import com.drivezy.drivezyBackend.dto.CompanyRegisterRequest;
import com.drivezy.drivezyBackend.dto.UserProfileResponse;
import com.drivezy.drivezyBackend.model.Company;
import com.drivezy.drivezyBackend.dto.AuthResponse;
import com.drivezy.drivezyBackend.service.CompanyService;
import com.drivezy.drivezyBackend.service.UserService;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired private CompanyService companyService;
    @Autowired private UserService userService;

    @PostMapping("/register")
    public AuthResponse registerCompany(@Valid @RequestBody CompanyRegisterRequest req) {
        companyService.registerCompanyWithAdmin(req);
        return new AuthResponse("Company and admin registered successfully");
    }
    
    
    @GetMapping("/all")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }
    
    @PatchMapping("/{id}/verify")
    public AuthResponse verifyCompany(@PathVariable Long id) {
        companyService.verifyCompany(id);
        return new AuthResponse("Company verified successfully");
    }
    
    @PutMapping("/{id}/update")
    public AuthResponse updateCompany(@PathVariable Long id, @Valid @RequestBody CompanyRegisterRequest req) {
        companyService.updateCompany(id, req);
        return new AuthResponse("Company updated successfully");
    }
    
    
    @GetMapping("/unverified")
    public List<Company> getUnverifiedCompanies() {
        return companyService.getUnverifiedCompanies();
    }
    
    @GetMapping("/verified")
    public List<Company> getVerifiedCompanies() {
        return companyService.getVerifiedCompanies();
    }
    
    @GetMapping("/{companyId}/providers")
    public List<UserProfileResponse> getCompanyProviders(@PathVariable Long companyId) {
        return userService.getProvidersByCompany(companyId);
    }



}

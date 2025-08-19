package com.drivezy.drivezyBackend.service;

import com.drivezy.drivezyBackend.dto.*;
import com.drivezy.drivezyBackend.enums.UserRole;
import com.drivezy.drivezyBackend.exception.CustomException;
import com.drivezy.drivezyBackend.model.Company;
import com.drivezy.drivezyBackend.model.User;
import com.drivezy.drivezyBackend.repository.CompanyRepository;
import com.drivezy.drivezyBackend.repository.UserRepository;
import com.drivezy.drivezyBackend.config.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired private UserRepository userRepository;
    @Autowired private CompanyRepository companyRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtils jwtUtils;

    public void register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new CustomException("Email already registered");

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPhone(req.getPhone());
        user.setRole(req.getRole());
        user.setVerified(false);
        user.setCompanyAdmin(req.isCompanyAdmin());
        
        if (req.getCompanyId() != null) {
            Company company = companyRepository.findById(req.getCompanyId())
                    .orElseThrow(() -> new CustomException("Company not found"));
            user.setCompany(company);
        }

        userRepository.save(user);
    }

    public String login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new CustomException("Invalid email or password"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
            throw new CustomException("Invalid email or password");
        return jwtUtils.generateToken(user.getId(), user.getEmail(), user.getRole().name());
    }
}

package com.drivezy.drivezyBackend.service;

import com.drivezy.drivezyBackend.dto.ChangePasswordRequest;
import com.drivezy.drivezyBackend.dto.ProviderRegisterRequest;
import com.drivezy.drivezyBackend.dto.UpdateProfileRequest;
import com.drivezy.drivezyBackend.dto.UserProfileResponse;
import com.drivezy.drivezyBackend.enums.UserRole;
import com.drivezy.drivezyBackend.exception.CustomException;
import com.drivezy.drivezyBackend.exception.ResourceNotFoundException;
import com.drivezy.drivezyBackend.model.Company;
import com.drivezy.drivezyBackend.model.User;
import com.drivezy.drivezyBackend.repository.CompanyRepository;
import com.drivezy.drivezyBackend.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired private UserRepository userRepository;
	 @Autowired private CompanyRepository companyRepository;
	 @Autowired private PasswordEncoder passwordEncoder;

	public UserProfileResponse getMyProfile() {
	    String email = SecurityContextHolder.getContext().getAuthentication().getName();
	    User user = userRepository.findByEmail(email)
	    	       .orElseThrow(() -> new ResourceNotFoundException("User not found"));


	    UserProfileResponse profile = new UserProfileResponse();
	    profile.setId(user.getId());
	    profile.setName(user.getName());
	    profile.setEmail(user.getEmail());
	    profile.setPhone(user.getPhone());
	    profile.setRole(user.getRole());
	    profile.setVerified(user.isVerified());
	    profile.setCompanyAdmin(user.isCompanyAdmin());
	    profile.setCreatedAt(user.getCreatedAt());
	    if (user.getCompany() != null) {
	        profile.setCompanyId(user.getCompany().getId());
	        profile.setCompanyName(user.getCompany().getName());
	    }
	    return profile;
	}
	
	public void addProvider(Long companyId, ProviderRegisterRequest req) {
	    if (userRepository.existsByEmail(req.getEmail()))
	        throw new CustomException("Email already registered");

	    Company company = companyRepository.findById(companyId)
	            .orElseThrow(() -> new CustomException("Company not found"));

	    User provider = new User();
	    provider.setName(req.getName());
	    provider.setEmail(req.getEmail());
	    provider.setPassword(passwordEncoder.encode(req.getPassword()));
	    provider.setPhone(req.getPhone());
	    provider.setRole(UserRole.PROVIDER);
	    provider.setCompany(company);
	    provider.setVerified(false);

	    userRepository.save(provider);
	}

	// UserService.java
	public void changePassword(String email, ChangePasswordRequest req) {
	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new CustomException("User not found"));
	    if (!passwordEncoder.matches(req.getOldPassword(), user.getPassword())) {
	        throw new CustomException("Old password is incorrect");
	    }
	    user.setPassword(passwordEncoder.encode(req.getNewPassword()));
	    userRepository.save(user);
	}
	
	public void updateProfile(String email, UpdateProfileRequest req) {
	    User user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new CustomException("User not found"));
	    user.setName(req.getName());
	    user.setPhone(req.getPhone());
	    userRepository.save(user);
	}

	 public String getCurrentUserEmail() {
	        return SecurityContextHolder.getContext().getAuthentication().getName();
	    }

	    /** Utility: get current logged-in user entity */
	    public User getCurrentUser() {
	        return userRepository.findByEmail(getCurrentUserEmail())
	                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
	    }
	    
	    public List<UserProfileResponse> getProvidersByCompany(Long companyId) {
	        return userRepository.findByRoleAndCompanyId(UserRole.PROVIDER, companyId)
	                .stream()
	                .map(user -> {
	                    UserProfileResponse res = new UserProfileResponse();
	                    res.setId(user.getId());
	                    res.setName(user.getName());
	                    res.setEmail(user.getEmail());
	                    res.setPhone(user.getPhone());
	                    res.setRole(user.getRole());
	                    res.setVerified(user.isVerified());
	                    res.setCompanyAdmin(user.isCompanyAdmin());
	                    if (user.getCompany() != null) {
	                        res.setCompanyId(user.getCompany().getId());
	                        res.setCompanyName(user.getCompany().getName());
	                    }
	                    res.setCreatedAt(user.getCreatedAt());
	                    return res;
	                })
	                .collect(Collectors.toList());
	    }

}



package com.drivezy.drivezyBackend.service;

import com.drivezy.drivezyBackend.dto.UserProfileResponse;
import com.drivezy.drivezyBackend.enums.UserRole;
import com.drivezy.drivezyBackend.exception.CustomException;
import com.drivezy.drivezyBackend.model.Company;
import com.drivezy.drivezyBackend.model.User;
import com.drivezy.drivezyBackend.repository.CompanyRepository;
import com.drivezy.drivezyBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired private CompanyRepository companyRepository;
    @Autowired private UserRepository userRepository;

    public void verifyCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CustomException("Company not found"));
        company.setVerified(true);
        companyRepository.save(company);
    }

    public void verifyUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found"));
        user.setVerified(true);
        userRepository.save(user);
    }

    public List<UserProfileResponse> getUsersByRoleVerifiedAndQuery(UserRole role, boolean verified, String query) {
        List<User> users;
        if (query == null || query.isBlank()) {
            users = userRepository.findByRoleAndVerified(role, verified);
        } else {
            users = userRepository.searchByRoleVerifiedAndNameOrEmail(role, verified, query.trim());
        }

        return users.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private UserProfileResponse mapToResponse(User user) {
        UserProfileResponse res = new UserProfileResponse();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setPhone(user.getPhone());
        res.setRole(user.getRole());
        res.setVerified(user.isVerified());
        res.setCompanyAdmin(user.isCompanyAdmin());
        res.setCreatedAt(user.getCreatedAt());

        if (user.getCompany() != null) {
            res.setCompanyId(user.getCompany().getId());
            res.setCompanyName(user.getCompany().getName());
        }

        return res;
    }
}

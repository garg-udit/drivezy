package com.drivezy.drivezyBackend.service;

import com.drivezy.drivezyBackend.dto.CompanyRegisterRequest;
import com.drivezy.drivezyBackend.exception.CustomException;
import com.drivezy.drivezyBackend.model.Company;
import com.drivezy.drivezyBackend.model.User;
import com.drivezy.drivezyBackend.enums.UserRole;
import com.drivezy.drivezyBackend.repository.CompanyRepository;
import com.drivezy.drivezyBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class CompanyService {

    @Autowired private CompanyRepository companyRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public void registerCompanyWithAdmin(CompanyRegisterRequest req) {
        if (companyRepository.existsByEmail(req.getCompanyEmail()))
            throw new CustomException("Company email already exists");

        if (userRepository.existsByEmail(req.getAdminEmail()))
            throw new CustomException("Admin email already exists");

        Company company = new Company();
        company.setName(req.getCompanyName());
        company.setEmail(req.getCompanyEmail());
        company.setPhone(req.getCompanyPhone());
        company.setAddressLine(req.getAddressLine());
        company.setCity(req.getCity());
        company.setState(req.getState());
        company.setCountry(req.getCountry());
        company.setPinCode(req.getPinCode());
        company.setVerified(false);
        companyRepository.save(company);

        User admin = new User();
        admin.setName(req.getAdminName());
        admin.setEmail(req.getAdminEmail());
        admin.setPassword(passwordEncoder.encode(req.getAdminPassword()));
        admin.setPhone(req.getAdminPhone());
        admin.setRole(UserRole.PROVIDER);
        admin.setCompany(company);
        admin.setVerified(false);
        admin.setCompanyAdmin(true);
        userRepository.save(admin);
    }
    
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
    
    public void verifyCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
            .orElseThrow(() -> new CustomException("Company not found"));
        company.setVerified(true);
        companyRepository.save(company);
    }
    
    public void updateCompany(Long companyId, CompanyRegisterRequest req) {
        Company company = companyRepository.findById(companyId)
            .orElseThrow(() -> new CustomException("Company not found"));

        company.setName(req.getCompanyName());
        company.setEmail(req.getCompanyEmail());
        company.setPhone(req.getCompanyPhone());
        company.setAddressLine(req.getAddressLine());
        company.setCity(req.getCity());
        company.setState(req.getState());
        company.setCountry(req.getCountry());
        company.setPinCode(req.getPinCode());

        companyRepository.save(company);
    }

    public List<Company> getUnverifiedCompanies() {
        return companyRepository.findByVerifiedFalse();
    }
    
    public List<Company> getVerifiedCompanies() {
        return companyRepository.findByVerifiedTrue();
    }



}

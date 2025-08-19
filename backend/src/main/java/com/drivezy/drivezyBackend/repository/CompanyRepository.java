package com.drivezy.drivezyBackend.repository;

import com.drivezy.drivezyBackend.model.Company;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    boolean existsByEmail(String email);
    List<Company> findByVerifiedFalse();
    List<Company> findByVerifiedTrue();

}

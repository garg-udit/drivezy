
package com.drivezy.drivezyBackend.repository;

import com.drivezy.drivezyBackend.enums.UserRole;
import com.drivezy.drivezyBackend.model.Company;
import com.drivezy.drivezyBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    List<User> findByCompany(Company company);
    List<User> findByRoleAndVerified(UserRole role, boolean verified);
    List<User> findByRoleAndCompanyId(UserRole role, Long companyId);


    @Query("SELECT u FROM User u WHERE u.role = :role AND u.verified = :verified AND " +
           "(LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<User> searchByRoleVerifiedAndNameOrEmail(
        @Param("role") UserRole role,
        @Param("verified") boolean verified,
        @Param("query") String query
    );
}

package com.drivezy.drivezyBackend.dto;

import com.drivezy.drivezyBackend.enums.UserRole;
import jakarta.validation.constraints.*;

public class RegisterRequest {
    @NotBlank private String name;
    @NotBlank @Email private String email;
    @NotBlank @Size(min = 6) private String password;
    @NotBlank private String phone;

    @NotNull private UserRole role;
    private boolean isCompanyAdmin = false;
    private Long companyId = null;

    // Getters & setters
    public String getName() { return name; } public void setName(String name) { this.name = name; }
    public String getEmail() { return email; } public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; } public void setPassword(String password) { this.password = password; }
    public String getPhone() { return phone; } public void setPhone(String phone) { this.phone = phone; }
    public UserRole getRole() { return role; } public void setRole(UserRole role) { this.role = role; }
    public boolean isCompanyAdmin() { return isCompanyAdmin; } public void setCompanyAdmin(boolean companyAdmin) { this.isCompanyAdmin = companyAdmin; }
    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

}

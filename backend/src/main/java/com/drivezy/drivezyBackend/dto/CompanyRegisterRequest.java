package com.drivezy.drivezyBackend.dto;

import jakarta.validation.constraints.*;

public class CompanyRegisterRequest {
    @NotBlank private String companyName;
    @NotBlank @Email private String companyEmail;
    @NotBlank private String companyPhone;
    @NotBlank private String addressLine;
    @NotBlank private String city;
    @NotBlank private String state;
    @NotBlank private String country;
    @NotBlank private String pinCode;

    @NotBlank private String adminName;
    @NotBlank @Email private String adminEmail;
    @NotBlank @Size(min=6) private String adminPassword;
    @NotBlank private String adminPhone;

    // Getters & Setters
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyEmail() { return companyEmail; }
    public void setCompanyEmail(String companyEmail) { this.companyEmail = companyEmail; }

    public String getCompanyPhone() { return companyPhone; }
    public void setCompanyPhone(String companyPhone) { this.companyPhone = companyPhone; }

    public String getAddressLine() { return addressLine; }
    public void setAddressLine(String addressLine) { this.addressLine = addressLine; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getPinCode() { return pinCode; }
    public void setPinCode(String pinCode) { this.pinCode = pinCode; }

    public String getAdminName() { return adminName; }
    public void setAdminName(String adminName) { this.adminName = adminName; }

    public String getAdminEmail() { return adminEmail; }
    public void setAdminEmail(String adminEmail) { this.adminEmail = adminEmail; }

    public String getAdminPassword() { return adminPassword; }
    public void setAdminPassword(String adminPassword) { this.adminPassword = adminPassword; }

    public String getAdminPhone() { return adminPhone; }
    public void setAdminPhone(String adminPhone) { this.adminPhone = adminPhone; }
}

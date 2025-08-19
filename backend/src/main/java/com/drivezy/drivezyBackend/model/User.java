package com.drivezy.drivezyBackend.model;

import com.drivezy.drivezyBackend.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Column(unique = true)
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6)
    private String password;

    @NotBlank
    private String phone;

    @Enumerated(EnumType.STRING)
    @NotNull
    private UserRole role = UserRole.USER;

    @ManyToOne
    private Company company;

    private boolean verified = false;

    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private boolean isCompanyAdmin = false;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Vehicle> vehicles = new ArrayList<>();


    public User() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public boolean isCompanyAdmin() { return isCompanyAdmin; }
    public void setCompanyAdmin(boolean companyAdmin) { this.isCompanyAdmin = companyAdmin; }

    

}

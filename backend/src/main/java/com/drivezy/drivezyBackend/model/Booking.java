package com.drivezy.drivezyBackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

import com.drivezy.drivezyBackend.enums.BookingStatus;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Vehicle vehicle;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private BigDecimal totalPrice;

    @NotNull
    private Double securityAmount;

    private boolean physicalDocumentRequired = true;
    private boolean physicalDocumentVerified;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public Booking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public Double getSecurityAmount() { return securityAmount; }
    public void setSecurityAmount(Double double1) { this.securityAmount = double1; }

    public boolean isPhysicalDocumentRequired() { return physicalDocumentRequired; }
    public void setPhysicalDocumentRequired(boolean physicalDocumentRequired) {
        this.physicalDocumentRequired = physicalDocumentRequired;
    }

    public boolean isPhysicalDocumentVerified() { return physicalDocumentVerified; }
    public void setPhysicalDocumentVerified(boolean physicalDocumentVerified) {
        this.physicalDocumentVerified = physicalDocumentVerified;
    }

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

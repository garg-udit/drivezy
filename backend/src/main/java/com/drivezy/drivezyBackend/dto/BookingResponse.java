package com.drivezy.drivezyBackend.dto;

import com.drivezy.drivezyBackend.enums.BookingStatus;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class BookingResponse {
    private Long id;
    private Long vehicleId;
    private String vehicleTitle;
    private Long userId;
    private String userName;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal totalPrice;
    private Double securityAmount;
    private boolean physicalDocumentRequired;
    private boolean physicalDocumentVerified;
    private BookingStatus status;
    private LocalDateTime createdAt;
    // getters & setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getVehicleTitle() {
		return vehicleTitle;
	}
	public void setVehicleTitle(String vehicleTitle) {
		this.vehicleTitle = vehicleTitle;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public BigDecimal getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}
	public Double getSecurityAmount() {
		return securityAmount;
	}
	public void setSecurityAmount(Double double1) {
		this.securityAmount = double1;
	}
	public boolean isPhysicalDocumentRequired() {
		return physicalDocumentRequired;
	}
	public void setPhysicalDocumentRequired(boolean physicalDocumentRequired) {
		this.physicalDocumentRequired = physicalDocumentRequired;
	}
	public boolean isPhysicalDocumentVerified() {
		return physicalDocumentVerified;
	}
	public void setPhysicalDocumentVerified(boolean physicalDocumentVerified) {
		this.physicalDocumentVerified = physicalDocumentVerified;
	}
	public BookingStatus getStatus() {
		return status;
	}
	public void setStatus(BookingStatus status) {
		this.status = status;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
    
    
}

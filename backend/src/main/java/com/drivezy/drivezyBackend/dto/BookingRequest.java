package com.drivezy.drivezyBackend.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class BookingRequest {
    @NotNull private Long vehicleId;
    @NotNull private LocalDate startDate;
    @NotNull private LocalDate endDate;
    private boolean physicalDocumentRequired;
    
	public Long getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
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
	public boolean isPhysicalDocumentRequired() {
		return physicalDocumentRequired;
	}
	public void setPhysicalDocumentRequired(boolean physicalDocumentRequired) {
		this.physicalDocumentRequired = physicalDocumentRequired;
	}
    
    
}

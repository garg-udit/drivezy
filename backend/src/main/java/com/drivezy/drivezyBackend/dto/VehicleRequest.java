package com.drivezy.drivezyBackend.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

import com.drivezy.drivezyBackend.enums.Location;
import com.drivezy.drivezyBackend.enums.VehicleCategory;
import com.drivezy.drivezyBackend.enums.VehicleType;

public class VehicleRequest {
    @NotBlank
	public String title;
    
    public String description;

    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@NotNull @DecimalMin("0.0")
    public BigDecimal pricePerDay;

    @NotBlank
    public String vehicleBrand;

    @NotBlank
    public String vehicleModel;

    public boolean geared;

    @NotBlank
    public String color;

    @NotBlank
    public String vehicleNumber;

    @NotNull
    public String location;

    
    @NotNull
    public VehicleCategory vehicleCategory;

    @NotNull
    @Min(0)
    public Double securityAmount;


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public BigDecimal getPricePerDay() {
		return pricePerDay;
	}

	public void setPricePerDay(BigDecimal pricePerDay) {
		this.pricePerDay = pricePerDay;
	}

	public String getVehicleBrand() {
		return vehicleBrand;
	}

	public void setVehicleBrand(String vehicleBrand) {
		this.vehicleBrand = vehicleBrand;
	}

	public String getVehicleModel() {
		return vehicleModel;
	}

	public void setVehicleModel(String vehicleModel) {
		this.vehicleModel = vehicleModel;
	}

	public boolean isGeared() {
		return geared;
	}

	public void setGeared(boolean geared) {
		this.geared = geared;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getVehicleNumber() {
		return vehicleNumber;
	}

	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}

	

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

//	public VehicleType getVehicleType() {
//		return vehicleType;
//	}
//
//	public void setVehicleType(VehicleType vehicleType) {
//		this.vehicleType = vehicleType;
//	}

	public VehicleCategory getVehicleCategory() {
		return vehicleCategory;
	}

	public void setVehicleCategory(VehicleCategory vehicleCategory) {
		this.vehicleCategory = vehicleCategory;
	}

	public Double getSecurityAmount() {
		return securityAmount;
	}

	public void setSecurityAmount(Double securityAmount) {
		this.securityAmount = securityAmount;
	}

	

    
    
    // Getters and Setters...
}

package com.drivezy.drivezyBackend.dto;

import com.drivezy.drivezyBackend.enums.VehicleType;
import com.drivezy.drivezyBackend.enums.Location;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class VehicleDTO {
    @NotBlank private String title;
    private String description;
    @NotNull @DecimalMin(value = "0.0", inclusive = false) private BigDecimal pricePerDay;
    @NotNull private Location location;
    @NotNull private VehicleType vehicleType;
    @NotBlank private String vehicleNumber;
    private boolean geared;
    @NotBlank private String color;
    @NotNull private Long modelId;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(BigDecimal pricePerDay) { this.pricePerDay = pricePerDay; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public VehicleType getVehicleType() { return vehicleType; }
    public void setVehicleType(VehicleType vehicleType) { this.vehicleType = vehicleType; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public boolean isGeared() { return geared; }
    public void setGeared(boolean geared) { this.geared = geared; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public Long getModelId() { return modelId; }
    public void setModelId(Long modelId) { this.modelId = modelId; }
}

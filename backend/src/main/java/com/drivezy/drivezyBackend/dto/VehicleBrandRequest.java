package com.drivezy.drivezyBackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class VehicleBrandRequest {
    @NotBlank private String name;
    @NotBlank @Pattern(regexp = "TWO_WHEELER|FOUR_WHEELER|BOTH")
    private String vehicleCategory;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getVehicleCategory() { return vehicleCategory; }
    public void setVehicleCategory(String vehicleCategory) { this.vehicleCategory = vehicleCategory; }
}

package com.drivezy.drivezyBackend.model;

import com.drivezy.drivezyBackend.enums.VehicleCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "vehicle_brands")
public class VehicleBrand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @NotNull
    private VehicleCategory vehicleCategory;

    public VehicleBrand() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public VehicleCategory getVehicleCategory() { return vehicleCategory; }
    public void setVehicleCategory(VehicleCategory vehicleCategory) { this.vehicleCategory = vehicleCategory; }
}

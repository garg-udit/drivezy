package com.drivezy.drivezyBackend.model;

import com.drivezy.drivezyBackend.enums.AppliesTo;
import com.drivezy.drivezyBackend.enums.VehicleType;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "required_documents")
public class RequiredDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String documentName;

    @Enumerated(EnumType.STRING)
    @NotNull
    private AppliesTo appliesTo;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    private boolean mandatory;

    public RequiredDocument() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDocumentName() { return documentName; }
    public void setDocumentName(String documentName) { this.documentName = documentName; }

    public AppliesTo getAppliesTo() { return appliesTo; }
    public void setAppliesTo(AppliesTo appliesTo) { this.appliesTo = appliesTo; }

    public VehicleType getVehicleType() { return vehicleType; }
    public void setVehicleType(VehicleType vehicleType) { this.vehicleType = vehicleType; }

    public boolean isMandatory() { return mandatory; }
    public void setMandatory(boolean mandatory) { this.mandatory = mandatory; }
}

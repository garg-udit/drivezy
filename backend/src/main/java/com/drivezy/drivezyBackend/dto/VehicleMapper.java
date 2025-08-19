package com.drivezy.drivezyBackend.dto;

import com.drivezy.drivezyBackend.model.Vehicle;

public class VehicleMapper {

    public static VehicleResponse toResponse(Vehicle vehicle) {
        VehicleResponse response = new VehicleResponse();
        response.setId(vehicle.getId());
        response.setTitle(vehicle.getTitle());
        response.setDescription(vehicle.getDescription());
        response.setPricePerDay(vehicle.getPricePerDay());
        response.setLocation(vehicle.getLocation());
        response.setVehicleNumber(vehicle.getVehicleNumber());
        response.setGeared(vehicle.isGeared());
        response.setColor(vehicle.getColor());
        response.setVehicleBrand(vehicle.getVehicleBrand());
        response.setVehicleModel(vehicle.getVehicleModel());
        response.setRcUrl(vehicle.getRcUrl());
        response.setUserId(vehicle.getUser().getId());
        response.setApproved(vehicle.isApproved());
        response.setCreatedAt(vehicle.getCreatedAt());
        response.setVehicleCategory(vehicle.getVehicleCategory());
        response.setSecurityAmount(vehicle.getSecurityAmount());
        response.setImages(vehicle.getImages());
        return response;
    }
}


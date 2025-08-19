package com.drivezy.drivezyBackend.service;

import com.drivezy.drivezyBackend.dto.VehicleMapper;
import com.drivezy.drivezyBackend.dto.VehicleRequest;
import com.drivezy.drivezyBackend.dto.VehicleResponse;
import com.drivezy.drivezyBackend.dto.VehicleWithUserResponse;
import com.drivezy.drivezyBackend.exception.ResourceNotFoundException;
import com.drivezy.drivezyBackend.model.Vehicle;
import com.drivezy.drivezyBackend.model.VehicleImage;
import com.drivezy.drivezyBackend.repository.VehicleImageRepository;
import com.drivezy.drivezyBackend.repository.VehicleRepository;
import com.drivezy.drivezyBackend.util.S3Util;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final VehicleImageRepository imageRepository;
    private final S3Util s3Util;

    public VehicleService(VehicleRepository vehicleRepository, VehicleImageRepository imageRepository, S3Util s3Util) {
        this.vehicleRepository = vehicleRepository;
        this.imageRepository = imageRepository;
        this.s3Util = s3Util;
    }

    public Vehicle createVehicle(VehicleRequest request, MultipartFile rcDoc, List<MultipartFile> images) throws IOException {
        Vehicle vehicle = new Vehicle();
        vehicle.setTitle(request.getTitle());
        vehicle.setPricePerDay(request.getPricePerDay());
        vehicle.setVehicleBrand(request.getVehicleBrand());
        vehicle.setVehicleModel(request.getVehicleModel());
        vehicle.setGeared(request.isGeared());
        vehicle.setColor(request.getColor());
        vehicle.setLocation(request.getLocation());
        vehicle.setVehicleNumber(request.getVehicleNumber());
        vehicle.setVehicleCategory(request.getVehicleCategory());
        vehicle.setSecurityAmount(request.getSecurityAmount());


        if (rcDoc != null && !rcDoc.isEmpty()) {
            String rcUrl = s3Util.uploadFile(rcDoc, "rc-docs");
            vehicle.setRcUrl(rcUrl);
        }

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        for (MultipartFile image : images) {
            String imageUrl = s3Util.uploadFile(image, "vehicle-images");
            VehicleImage vehicleImage = new VehicleImage(imageUrl, savedVehicle);
            imageRepository.save(vehicleImage);
        }

        return savedVehicle;
    }
    
    public List<VehicleResponse> getVehiclesByUserAndApproval(Long userId, boolean approved) {
        List<Vehicle> vehicles = vehicleRepository.findByUserIdAndApproved(userId, approved);
        return vehicles.stream()
                       .map(VehicleMapper::toResponse)
                       .collect(Collectors.toList());
    }
    
    public List<VehicleResponse> getVehiclesByUserId(Long userId) {
        List<Vehicle> vehicles = vehicleRepository.findByUserId(userId);
        return vehicles.stream()
                .map(VehicleMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    public List<VehicleResponse> getVehiclesByApprovalStatus(boolean approved) {
        List<Vehicle> vehicles = vehicleRepository.findByApproved(approved);
        return vehicles.stream()
                .map(VehicleMapper::toResponse)
                .collect(Collectors.toList());
    }

    
    public String approveVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id: " + id));

        vehicle.setApproved(true);
        vehicleRepository.save(vehicle);

        return "Vehicle approved successfully";
    }
    
    @Transactional(readOnly = true)
    public List<VehicleWithUserResponse> getVehiclesByCompanyId(Long companyId) {
        List<Vehicle> vehicles = vehicleRepository.findAllByCompanyId(companyId);
        return vehicles.stream()
                       .map(VehicleWithUserResponse::new)
                       .toList();
    }



}

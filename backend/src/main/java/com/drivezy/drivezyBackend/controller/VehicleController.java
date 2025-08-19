package com.drivezy.drivezyBackend.controller;

import com.drivezy.drivezyBackend.config.JwtUtils;
import com.drivezy.drivezyBackend.dto.VehicleRequest;
import com.drivezy.drivezyBackend.dto.VehicleResponse;
import com.drivezy.drivezyBackend.dto.VehicleWithUserResponse;
import com.drivezy.drivezyBackend.model.User;
import com.drivezy.drivezyBackend.model.Vehicle;
import com.drivezy.drivezyBackend.model.VehicleImage;
import com.drivezy.drivezyBackend.repository.UserRepository;
import com.drivezy.drivezyBackend.repository.VehicleRepository;
import com.drivezy.drivezyBackend.service.S3Service;
import com.drivezy.drivezyBackend.service.VehicleService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;
    
    
    @Autowired
    private VehicleService vehicleService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtils jwtUtil;

    @Autowired
    private S3Service s3Service;
    
    @PostMapping("/create")
    public ResponseEntity<VehicleResponse> createVehicle(
            @Valid @RequestBody VehicleRequest request,
            @RequestHeader("Authorization") String authHeader
    ) {
        try {
            String token = authHeader.replace("Bearer ", "");
            Long userId = jwtUtil.extractUserId(token);

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Vehicle vehicle = new Vehicle();
            vehicle.setTitle(request.title);
            vehicle.setDescription(request.description);
            vehicle.setPricePerDay(request.pricePerDay);
            vehicle.setLocation(request.location);
            vehicle.setVehicleNumber(request.vehicleNumber);
            vehicle.setGeared(request.geared);
            vehicle.setColor(request.color);
            vehicle.setVehicleBrand(request.vehicleBrand);
            vehicle.setVehicleModel(request.vehicleModel);
            vehicle.setVehicleCategory(request.vehicleCategory);
            vehicle.setSecurityAmount(request.securityAmount);
            vehicle.setUser(user);

            return ResponseEntity.ok(new VehicleResponse(vehicleRepository.save(vehicle)));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    
    
    
    @PostMapping("/{id}/upload-images")
    public ResponseEntity<String> uploadImages(
            @PathVariable Long id,
            @RequestParam("vehicleImages") List<MultipartFile> vehicleImages,
            @RequestParam("rcImage") MultipartFile rcImage
    ) {
        Vehicle vehicle = vehicleRepository.findById(id).orElseThrow(() -> new RuntimeException("Vehicle not found"));

        try {
            List<VehicleImage> images = new ArrayList<>();
            for (MultipartFile file : vehicleImages) {
                String imageUrl = s3Service.uploadFile(file, "vehicle-images/");
                VehicleImage image = new VehicleImage();
                image.setImageUrl(imageUrl);
                image.setVehicle(vehicle);
                images.add(image);
            }

            String rcUrl = s3Service.uploadFile(rcImage, "vehicle-docs/");
            vehicle.setImages(images);
            vehicle.setRcUrl(rcUrl);
            vehicleRepository.save(vehicle);

            return ResponseEntity.ok("Images and RC uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }
    }
    
    
    @GetMapping("/my")
    public ResponseEntity<List<VehicleResponse>> getMyVehicles(
            @RequestParam boolean approved,
            @RequestHeader("Authorization") String authHeader
    ) {
    	 String token = authHeader.replace("Bearer ", "");
         Long userId = jwtUtil.extractUserId(token);
        List<VehicleResponse> vehicles = vehicleService.getVehiclesByUserAndApproval(userId, approved);
        return ResponseEntity.ok(vehicles);
    }
    
    @GetMapping("/myVehicles")
    public ResponseEntity<List<VehicleResponse>> getVehiclesForCurrentUser(
    		@RequestHeader("Authorization") String authHeader
    		) {
    	String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtil.extractUserId(token);
        List<VehicleResponse> responses = vehicleService.getVehiclesByUserId(userId);
        return ResponseEntity.ok(responses);
    }
    
    @GetMapping("/status")
    public ResponseEntity<List<VehicleResponse>> getVehiclesByStatus(@RequestParam boolean approved) {
        List<VehicleResponse> responses = vehicleService.getVehiclesByApprovalStatus(approved);
        return ResponseEntity.ok(responses);
    }

    
    @PutMapping("/{id}/approve")
    public ResponseEntity<String> approveVehicle(@PathVariable Long id) {
        String message = vehicleService.approveVehicle(id);
        return ResponseEntity.ok(message);
    }
    
    @GetMapping("/by-company/{companyId}")
    public ResponseEntity<List<VehicleWithUserResponse>> getVehiclesByCompanyId(@PathVariable Long companyId) {
        List<VehicleWithUserResponse> vehicles = vehicleService.getVehiclesByCompanyId(companyId);
        return ResponseEntity.ok(vehicles);
    }
    
    @GetMapping("/{vehicleId}")
    public ResponseEntity<VehicleResponse> getVehicleById(@PathVariable Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + vehicleId));

        VehicleResponse response = new VehicleResponse(vehicle);
        return ResponseEntity.ok(response);
    }

}

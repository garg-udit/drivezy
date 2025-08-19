package com.drivezy.drivezyBackend.service;

import com.drivezy.drivezyBackend.dto.VehicleModelRequest;
import com.drivezy.drivezyBackend.exception.CustomException;
import com.drivezy.drivezyBackend.exception.ResourceNotFoundException;
import com.drivezy.drivezyBackend.model.VehicleBrand;
import com.drivezy.drivezyBackend.model.VehicleModel;
import com.drivezy.drivezyBackend.repository.VehicleBrandRepository;
import com.drivezy.drivezyBackend.repository.VehicleModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleModelService {
    @Autowired private VehicleModelRepository modelRepo;
    @Autowired private VehicleBrandRepository brandRepo;

    public VehicleModel addModel(VehicleModelRequest req) {
        VehicleBrand brand = brandRepo.findById(req.getBrandId())
                .orElseThrow(() -> new CustomException("Brand not found"));
        VehicleModel model = new VehicleModel();
        model.setName(req.getName());
        model.setBrand(brand);
        return modelRepo.save(model);
    }

    public List<VehicleModel> getAllModels() {
        return modelRepo.findAll();
    }
    
    public List<VehicleModel> getModelsByBrand(Long brandId) {
        VehicleBrand brand = brandRepo.findById(brandId)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
        return modelRepo.findByBrandId(brandId);
    }
}

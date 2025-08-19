package com.drivezy.drivezyBackend.service;

import com.drivezy.drivezyBackend.dto.VehicleBrandRequest;
import com.drivezy.drivezyBackend.enums.VehicleCategory;
import com.drivezy.drivezyBackend.exception.CustomException;
import com.drivezy.drivezyBackend.model.VehicleBrand;
import com.drivezy.drivezyBackend.repository.VehicleBrandRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VehicleBrandService {
    @Autowired private VehicleBrandRepository brandRepo;

    public VehicleBrand addBrand(VehicleBrandRequest req) {
        if (brandRepo.existsByName(req.getName()))
            throw new CustomException("Brand already exists");

        VehicleBrand brand = new VehicleBrand();
        brand.setName(req.getName());
        brand.setVehicleCategory(VehicleCategory.valueOf(req.getVehicleCategory()));
        return brandRepo.save(brand);
    }
    
    public List<VehicleBrand> getAllBrands() {
        return brandRepo.findAll();
    }
}

package com.drivezy.drivezyBackend.controller;

import com.drivezy.drivezyBackend.dto.VehicleBrandRequest;
import com.drivezy.drivezyBackend.model.VehicleBrand;
import com.drivezy.drivezyBackend.service.VehicleBrandService;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/brands")
public class VehicleBrandController {
    @Autowired private VehicleBrandService brandService;

    @PostMapping
    public VehicleBrand addBrand(@Valid @RequestBody VehicleBrandRequest req) {
        return brandService.addBrand(req);
    }
    
    @GetMapping
    public List<VehicleBrand> getAllBrands() {
        return brandService.getAllBrands();
    }
}

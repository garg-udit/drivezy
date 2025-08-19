package com.drivezy.drivezyBackend.controller;

import com.drivezy.drivezyBackend.dto.VehicleModelRequest;
import com.drivezy.drivezyBackend.model.VehicleModel;
import com.drivezy.drivezyBackend.service.VehicleModelService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/models")
public class VehicleModelController {
    @Autowired private VehicleModelService modelService;

    @PostMapping
    public VehicleModel addModel(@Valid @RequestBody VehicleModelRequest req) {
        return modelService.addModel(req);
    }

    @GetMapping
    public List<VehicleModel> list() {
        return modelService.getAllModels();
    }
    
    @GetMapping("/brand/{brandId}")
    public List<VehicleModel> listByBrand(@PathVariable Long brandId) {
        return modelService.getModelsByBrand(brandId);
    }
    
}

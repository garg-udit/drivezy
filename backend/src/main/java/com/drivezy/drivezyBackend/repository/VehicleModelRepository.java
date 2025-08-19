package com.drivezy.drivezyBackend.repository;

import com.drivezy.drivezyBackend.model.VehicleModel;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleModelRepository extends JpaRepository<VehicleModel, Long> {
	 List<VehicleModel> findByBrandId(Long brandId);
}

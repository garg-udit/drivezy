package com.drivezy.drivezyBackend.repository;

import com.drivezy.drivezyBackend.model.VehicleBrand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleBrandRepository extends JpaRepository<VehicleBrand, Long> {
    boolean existsByName(String name);
}

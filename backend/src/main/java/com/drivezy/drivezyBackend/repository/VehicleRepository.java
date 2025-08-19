package com.drivezy.drivezyBackend.repository;

import com.drivezy.drivezyBackend.model.Vehicle;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

	List<Vehicle> findByUserIdAndApproved(Long userId, boolean approved);
	List<Vehicle> findByUserId(Long userId);
	List<Vehicle> findByApproved(boolean approved);
	Optional<Vehicle> findById(Long id);
	
	@Query("SELECT v FROM Vehicle v WHERE v.user.company.id = :companyId")
	List<Vehicle> findAllByCompanyId(@Param("companyId") Long companyId);



}

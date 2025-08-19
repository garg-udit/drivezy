package com.drivezy.drivezyBackend.repository;

import com.drivezy.drivezyBackend.model.Booking;
import com.drivezy.drivezyBackend.model.User;
import com.drivezy.drivezyBackend.model.Vehicle;
import com.drivezy.drivezyBackend.enums.BookingStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);
    List<Booking> findByVehicleIn(List<Vehicle> vehicles);
    List<Booking> findByVehicleInAndStatus(List<Vehicle> vehicles, BookingStatus status);
    List<Booking> findByStatus(BookingStatus status);


    @Query("SELECT b FROM Booking b WHERE b.vehicle.user.id = :userId")
    List<Booking> findAllByVehicleOwnerId(@Param("userId") Long userId);
    
    
    @Query("SELECT b FROM Booking b WHERE b.user.id = :userId AND (:status IS NULL OR b.status = :status)")
    List<Booking> findByUserIdAndOptionalStatus(@Param("userId") Long userId, @Param("status") BookingStatus status);

    


    // Filter by status
//    @Query("SELECT b FROM Booking b WHERE b.vehicle.user.id = :userId AND b.status = :status")
//    List<Booking> findAllByVehicleOwnerIdAndStatus(Long userId, BookingStatus status);

    
    @Query("SELECT b FROM Booking b WHERE b.vehicle.user.id = :ownerId AND (:status IS NULL OR b.status = :status)")
    List<Booking> findAllByVehicleOwnerIdAndStatus(@Param("ownerId") Long ownerId, @Param("status") BookingStatus status);

    
    
    @Query("SELECT b FROM Booking b WHERE b.vehicle = :vehicle AND b.status IN ('PENDING', 'ACCEPTED') " +
           "AND (b.startDate <= :endDate AND b.endDate >= :startDate)")
    List<Booking> findConflictingBookings(Vehicle vehicle, LocalDate startDate, LocalDate endDate);
    
    

}

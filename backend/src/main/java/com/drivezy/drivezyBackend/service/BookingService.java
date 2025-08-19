package com.drivezy.drivezyBackend.service;

import com.drivezy.drivezyBackend.dto.BookingRequest;
import com.drivezy.drivezyBackend.dto.BookingResponse;
import com.drivezy.drivezyBackend.enums.BookingStatus;
import com.drivezy.drivezyBackend.exception.CustomException;
import com.drivezy.drivezyBackend.exception.ResourceNotFoundException;
import com.drivezy.drivezyBackend.model.*;
import com.drivezy.drivezyBackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired private BookingRepository bookingRepo;
    @Autowired private VehicleRepository vehicleRepo;
    @Autowired private UserRepository userRepo;

    // Place booking by user
    public BookingResponse placeBooking(BookingRequest req, User user) {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Vehicle vehicle = vehicleRepo.findById(req.getVehicleId())
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found"));

        if (!vehicle.isApproved()) throw new CustomException("Vehicle not approved for booking");

        // Check availability
        List<Booking> conflicts = bookingRepo.findConflictingBookings(vehicle, req.getStartDate(), req.getEndDate());
//        if (!conflicts.isEmpty()) throw new CustomException("Vehicle is not available in selected dates");
        boolean hasConfirmedConflict = conflicts.stream()
                .anyMatch(b -> b.getStatus() == BookingStatus.ACCEPTED);

        if (hasConfirmedConflict) {
            throw new CustomException("Vehicle is already booked for the selected dates");
        }
        long days = req.getEndDate().toEpochDay() - req.getStartDate().toEpochDay() + 1;
        if (days <= 0) throw new CustomException("Invalid date range");

        BigDecimal totalPrice = vehicle.getPricePerDay().multiply(BigDecimal.valueOf(days));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setStartDate(req.getStartDate());
        booking.setEndDate(req.getEndDate());
        booking.setTotalPrice(totalPrice);
        booking.setSecurityAmount(vehicle.getSecurityAmount());
        booking.setPhysicalDocumentRequired(req.isPhysicalDocumentRequired());
        booking.setPhysicalDocumentVerified(false);
        booking.setStatus(BookingStatus.PENDING);

        bookingRepo.save(booking);
        return toResponse(booking);
    }

    // Cancel booking by user
    public void cancelBooking(Long id) {
        Booking booking = findBookingOwnedByCurrentUser(id);
        if (booking.getStatus() != BookingStatus.PENDING) throw new CustomException("Cannot cancel booking at this stage");
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepo.save(booking);
    }

    // Accept / complete / cancel by provider
    public void updateStatus(Long id, BookingStatus newStatus) {
        Booking booking = bookingRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!booking.getVehicle().getUser().getEmail().equals(email))
            throw new CustomException("Not your booking");

        booking.setStatus(newStatus);
        bookingRepo.save(booking);
    }

    // Auto-complete (runs daily)
    @Scheduled(cron = "0 0 1 * * ?")
    public void autoCompleteBookings() {
        List<Booking> active = bookingRepo.findByStatus(BookingStatus.ACCEPTED);
        LocalDate today = LocalDate.now();
        for (Booking b : active) {
            if (b.getEndDate().isBefore(today) || b.getEndDate().isEqual(today)) {
                b.setStatus(BookingStatus.COMPLETED);
                bookingRepo.save(b);
            }
        }
    }

    // Filter bookings (can add params: status, from, to)
//    public List<BookingResponse> filterBookings(Optional<BookingStatus> status, Optional<LocalDate> from, Optional<LocalDate> to) {
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        User user = userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
//        List<Booking> bookings;
//
//        if (user.getRole().name().equals("ADMIN")) {
//            bookings = bookingRepo.findAll();
//        } else if (user.isCompanyAdmin()) {
//            List<User> companyUsers = userRepo.findByCompany(user.getCompany());
//            List<Vehicle> vehicles = vehicleRepo.findByUserIn(companyUsers);
//            bookings = bookingRepo.findByVehicleIn(vehicles);
//        } else if (user.getRole().name().equals("PROVIDER")) {
//            List<Vehicle> vehicles = vehicleRepo.findByUser(user);
//            bookings = bookingRepo.findByVehicleIn(vehicles);
//        } else {
//            bookings = bookingRepo.findByUser(user);
//        }

//        return bookings.stream()
//                .filter(b -> status.map(s -> b.getStatus() == s).orElse(true))
//                .filter(b -> from.map(f -> !b.getStartDate().isBefore(f)).orElse(true))
//                .filter(b -> to.map(t -> !b.getEndDate().isAfter(t)).orElse(true))
//                .map(this::toResponse)
//                .collect(Collectors.toList());
//    }

    private Booking findBookingOwnedByCurrentUser(Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Booking booking = bookingRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getUser().getEmail().equals(email))
            throw new CustomException("Not your booking");
        return booking;
    }

    private BookingResponse toResponse(Booking b) {
        BookingResponse r = new BookingResponse();
        r.setId(b.getId());
        r.setVehicleId(b.getVehicle().getId());
        r.setVehicleTitle(b.getVehicle().getTitle());
        r.setUserId(b.getUser().getId());
        r.setUserName(b.getUser().getName());
        r.setStartDate(b.getStartDate());
        r.setEndDate(b.getEndDate());
        r.setTotalPrice(b.getTotalPrice());
        r.setSecurityAmount(b.getSecurityAmount());
        r.setPhysicalDocumentRequired(b.isPhysicalDocumentRequired());
        r.setPhysicalDocumentVerified(b.isPhysicalDocumentVerified());
        r.setStatus(b.getStatus());
        r.setCreatedAt(b.getCreatedAt());
        return r;
    }
    
    
    public void updateBookingStatus(Long bookingId, BookingStatus newStatus) {
        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        booking.setStatus(newStatus);
        bookingRepo.save(booking);
    }
    
    public List<BookingResponse> getBookingsByStatus(BookingStatus status) {
        List<Booking> bookings = bookingRepo.findByStatus(status);
        return bookings.stream()
                .map(this::toResponse)
                .toList();
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepo.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }
    
    public List<BookingResponse> getBookingsForUserVehicles(Long ownerId, BookingStatus status) {
        List<Booking> bookings = bookingRepo.findAllByVehicleOwnerIdAndStatus(ownerId, status);
        return bookings.stream()
                .map(this::toResponse)
                .toList();
    }
    
    
    public List<BookingResponse> getBookingsPlacedByUser(Long userId, BookingStatus status) {
        List<Booking> bookings = bookingRepo.findByUserIdAndOptionalStatus(userId, status);
        return bookings.stream()
                .map(this::toResponse)
                .toList();
    }


    


}

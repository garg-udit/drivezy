package com.drivezy.drivezyBackend.controller;

import com.drivezy.drivezyBackend.config.JwtUtils;
import com.drivezy.drivezyBackend.dto.BookingRequest;
import com.drivezy.drivezyBackend.dto.BookingResponse;
import com.drivezy.drivezyBackend.enums.BookingStatus;
import com.drivezy.drivezyBackend.model.User;
import com.drivezy.drivezyBackend.repository.UserRepository;
import com.drivezy.drivezyBackend.service.BookingService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired private BookingService service;
    
    @Autowired
    private JwtUtils jwtUtil;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public BookingResponse place(@Valid @RequestBody BookingRequest req,
    		@RequestHeader("Authorization") String authHeader) {
    	String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtil.extractUserId(token);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return service.placeBooking(req, user);
    }

    @DeleteMapping("/{id}/cancel")
    public String cancel(@PathVariable Long id) {
        service.cancelBooking(id);
        return "Booking cancelled";
    }

    @PostMapping("/{id}/accept")
    public String accept(@PathVariable Long id) {
        service.updateStatus(id, BookingStatus.ACCEPTED);
        return "Booking accepted";
    }

    @PostMapping("/{id}/complete")
    public String complete(@PathVariable Long id) {
        service.updateStatus(id, BookingStatus.COMPLETED);
        return "Booking completed";
    }

    @PostMapping("/{id}/reject")
    public String reject(@PathVariable Long id) {
        service.updateStatus(id, BookingStatus.CANCELLED);
        return "Booking rejected";
    }

//    @GetMapping
//    public List<BookingResponse> filter(
//            @RequestParam Optional<BookingStatus> status,
//            @RequestParam Optional<LocalDate> from,
//            @RequestParam Optional<LocalDate> to) {
//        return service.filterBookings(status, from, to);
//    }
    
    
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<Map<String, String>> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam BookingStatus status) {

        service.updateBookingStatus(bookingId, status);

        String message = switch (status) {
            case ACCEPTED -> "Booking accepted successfully.";
            case REJECTED -> "Booking rejected.";
            case CANCELLED -> "Booking cancelled.";
            case COMPLETED -> "Booking completed successfully.";
            default -> "Booking status updated.";
        };

        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        response.put("status", status.name());

        return ResponseEntity.ok(response);
    }
    
    @GetMapping
    public ResponseEntity<List<BookingResponse>> getBookingsByStatus(
            @RequestParam(required = false) BookingStatus status) {

        List<BookingResponse> bookings;

        if (status != null) {
            bookings = service.getBookingsByStatus(status);
        } else {
            bookings = service.getAllBookings();
        }

        return ResponseEntity.ok(bookings);
    }
    
    
    @GetMapping("/my-vehicle-bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsForUserVehicles(
    		@RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) BookingStatus status) {
    	
    	String token = authHeader.replace("Bearer ", "");
    	 Long userId = jwtUtil.extractUserId(token);

        List<BookingResponse> bookings = service.getBookingsForUserVehicles(userId, status);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/user-bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsPlacedByUser(
    		@RequestHeader("Authorization") String authHeader,
            @RequestParam(required = false) BookingStatus status) {
    	String token = authHeader.replace("Bearer ", "");
    	Long userId = jwtUtil.extractUserId(token);
        List<BookingResponse> responses = service.getBookingsPlacedByUser(userId, status);
        return ResponseEntity.ok(responses);
    }





    
}


package com.elegancesalon.crm.controllers;

import com.elegancesalon.crm.model.*;
import com.elegancesalon.crm.payload.request.AppointmentRequest;
import com.elegancesalon.crm.payload.response.MessageResponse;
import com.elegancesalon.crm.repository.AppointmentRepository;
import com.elegancesalon.crm.repository.UserRepository;
import com.elegancesalon.crm.service.LoyaltyService;
import com.elegancesalon.crm.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private LoyaltyService loyaltyService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('STYLIST') or hasRole('RECEPTIONIST') or hasRole('ADMIN')")
    public ResponseEntity<?> createAppointment(@Valid @RequestBody AppointmentRequest appointmentRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
        
        LocalDateTime dateTime = LocalDateTime.parse(appointmentRequest.getDate() + "T" + appointmentRequest.getTime());
        Appointment appointment = new Appointment(
                user,
                dateTime,
                appointmentRequest.getService(),
                appointmentRequest.getStylist(),
                appointmentRequest.getNotes()
        );
        
        appointmentRepository.save(appointment);
        
        return ResponseEntity.ok(new MessageResponse("Appointment created successfully!"));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('STYLIST') or hasRole('RECEPTIONIST') or hasRole('ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(status);
        
        if (status == AppointmentStatus.COMPLETED) {
            loyaltyService.awardPoints(appointment.getUser(), 10, "Appointment completed");
        }
        
        appointmentRepository.save(appointment);
        return ResponseEntity.ok(new MessageResponse("Status updated successfully"));
    }

    @PostMapping("/{id}/photos")
    @PreAuthorize("hasRole('STYLIST')")
    public ResponseEntity<?> uploadPhotos(
            @PathVariable Long id,
            @RequestParam("before") MultipartFile beforePhoto,
            @RequestParam("after") MultipartFile afterPhoto) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        // Handle photo upload logic here
        
        return ResponseEntity.ok(new MessageResponse("Photos uploaded successfully"));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('STYLIST') or hasRole('RECEPTIONIST') or hasRole('ADMIN')")
    public ResponseEntity<List<Appointment>> getUserAppointments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
        
        List<Appointment> appointments = appointmentRepository.findByUser(user);
        
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('RECEPTIONIST') or hasRole('ADMIN')")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return ResponseEntity.ok(appointments);
    }
}

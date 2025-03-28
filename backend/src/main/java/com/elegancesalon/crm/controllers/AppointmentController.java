package com.elegancesalon.crm.controllers;

import com.elegancesalon.crm.model.Appointment;
import com.elegancesalon.crm.model.User;
import com.elegancesalon.crm.payload.request.AppointmentRequest;
import com.elegancesalon.crm.payload.response.MessageResponse;
import com.elegancesalon.crm.repository.AppointmentRepository;
import com.elegancesalon.crm.repository.UserRepository;
import com.elegancesalon.crm.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('STYLIST') or hasRole('RECEPTIONIST') or hasRole('ADMIN')")
    public ResponseEntity<?> createAppointment(@Valid @RequestBody AppointmentRequest appointmentRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: User is not found."));
        
        Appointment appointment = new Appointment(
                user, 
                appointmentRequest.getDate(),
                appointmentRequest.getTime(),
                appointmentRequest.getService(),
                appointmentRequest.getStylist(),
                appointmentRequest.getNotes()
        );
        
        appointmentRepository.save(appointment);
        
        return ResponseEntity.ok(new MessageResponse("Appointment created successfully!"));
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
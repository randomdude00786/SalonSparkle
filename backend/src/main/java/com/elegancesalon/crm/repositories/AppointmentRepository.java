package com.elegancesalon.crm.repositories;

import com.elegancesalon.crm.models.Appointment;
import com.elegancesalon.crm.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);
    List<Appointment> findByUserAndDateTimeBetween(User user, LocalDateTime start, LocalDateTime end);
    List<Appointment> findByConfirmedAndDateTimeBefore(boolean confirmed, LocalDateTime dateTime);
}
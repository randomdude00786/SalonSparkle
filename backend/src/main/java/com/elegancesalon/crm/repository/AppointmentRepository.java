package com.elegancesalon.crm.repository;

import com.elegancesalon.crm.model.Appointment;
import com.elegancesalon.crm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByDate(LocalDate date);
    List<Appointment> findByStylist(String stylist);
}
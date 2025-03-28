package com.elegancesalon.crm.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequest {
    
    @NotNull
    private LocalDate date;

    @NotNull
    private LocalTime time;

    @NotBlank
    @Size(max = 100)
    private String service;

    @NotBlank
    @Size(max = 50)
    private String stylist;

    @Size(max = 255)
    private String notes;

    public AppointmentRequest() {
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getStylist() {
        return stylist;
    }

    public void setStylist(String stylist) {
        this.stylist = stylist;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
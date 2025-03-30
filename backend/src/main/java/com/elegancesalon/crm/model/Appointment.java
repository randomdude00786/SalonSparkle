package com.elegancesalon.crm.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    private LocalDateTime date;

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

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    private Integer duration;
    private String beforePhoto;
    private String afterPhoto;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private Set<ProductRecommendation> productRecommendations;

    public Appointment() {
    }

    public Appointment(User user, LocalDateTime date, LocalTime time, String service, String stylist, String notes) {
        this.user = user;
        this.date = date;
        this.time = time;
        this.service = service;
        this.stylist = stylist;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
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

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getBeforePhoto() {
        return beforePhoto;
    }

    public void setBeforePhoto(String beforePhoto) {
        this.beforePhoto = beforePhoto;
    }

    public String getAfterPhoto() {
        return afterPhoto;
    }

    public void setAfterPhoto(String afterPhoto) {
        this.afterPhoto = afterPhoto;
    }

    public Set<ProductRecommendation> getProductRecommendations() {
        return productRecommendations;
    }

    public void setProductRecommendations(Set<ProductRecommendation> productRecommendations) {
        this.productRecommendations = productRecommendations;
    }
}
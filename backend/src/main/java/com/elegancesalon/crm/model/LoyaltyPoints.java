
package com.elegancesalon.crm.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class LoyaltyPoints {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private User user;
    
    private Integer points;
    private LocalDateTime earnedDate;
    private String description;
    
    // Getters and setters
}

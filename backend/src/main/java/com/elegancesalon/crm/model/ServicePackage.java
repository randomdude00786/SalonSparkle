
package com.elegancesalon.crm.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
public class ServicePackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private BigDecimal price;
    
    @ManyToMany
    private Set<Service> services;
    
    // Getters and setters
}

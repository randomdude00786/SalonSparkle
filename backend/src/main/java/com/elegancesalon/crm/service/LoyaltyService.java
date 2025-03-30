
package com.elegancesalon.crm.service;

import com.elegancesalon.crm.model.User;
import com.elegancesalon.crm.model.LoyaltyPoints;
import com.elegancesalon.crm.repository.LoyaltyPointsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class LoyaltyService {
    @Autowired
    private LoyaltyPointsRepository loyaltyPointsRepository;
    
    public void awardPoints(User user, Integer points, String description) {
        LoyaltyPoints loyaltyPoints = new LoyaltyPoints();
        loyaltyPoints.setUser(user);
        loyaltyPoints.setPoints(points);
        loyaltyPoints.setEarnedDate(LocalDateTime.now());
        loyaltyPoints.setDescription(description);
        
        loyaltyPointsRepository.save(loyaltyPoints);
    }
    
    public Integer getUserPoints(User user) {
        return loyaltyPointsRepository.sumPointsByUser(user);
    }
}

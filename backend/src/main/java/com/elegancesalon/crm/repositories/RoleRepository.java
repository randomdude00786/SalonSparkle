package com.elegancesalon.crm.repositories;

import com.elegancesalon.crm.models.ERole;
import com.elegancesalon.crm.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
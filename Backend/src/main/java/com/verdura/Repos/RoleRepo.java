package com.verdura.Repos;

import com.verdura.Models.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Roles, Long> {
    Roles findByName(String name);
}

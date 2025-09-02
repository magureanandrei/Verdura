package com.verdura.Repos;

import com.verdura.Models.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepo extends JpaRepository<UserSettings, Long> {
    UserSettings findTopByOrderByIdDesc();
    UserSettings findByUser_Id(Long userId);
}

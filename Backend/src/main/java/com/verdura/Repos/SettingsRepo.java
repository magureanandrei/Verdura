package com.verdura.Repos;

import com.verdura.Models.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SettingsRepo extends JpaRepository<UserSettings, Long> {
    UserSettings findTopByOrderByIdDesc();
    UserSettings findByUser_Id(Long userId);
    List<UserSettings> findAllByUser_Id(Long userId);
}

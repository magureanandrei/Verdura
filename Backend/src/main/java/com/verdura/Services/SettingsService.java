package com.verdura.Services;

import com.verdura.Repos.SettingsRepo;
import com.verdura.Models.UserSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsService {
    private final SettingsRepo settingsRepo;

    @Autowired
    public SettingsService(SettingsRepo settingsRepo) {
        this.settingsRepo = settingsRepo;
    }

    public UserSettings createSettings(UserSettings settings) {
        return settingsRepo.save(settings);
    }
    public UserSettings getSettings(Long id) {
        return settingsRepo.findById(id).orElse(null);
    }

    public UserSettings getTheLastUsersSettings() {
        return settingsRepo.findTopByOrderByIdDesc();
    }
    public void updateSettings(UserSettings settings) {
        settingsRepo.save(settings);
    }
    public void deleteSettings(Long id) {
        settingsRepo.deleteById(id);
    }
    public void deleteSettings(UserSettings settings) {
        settingsRepo.delete(settings);
    }
    public List<UserSettings> getAllSettings() {
        return settingsRepo.findAll();
    }
    public UserSettings getUserSettingsByUserId(Long userId) {
        return settingsRepo.findByUser_Id(userId);
    }
    public UserSettings updateDefaultSettings(UserSettings settings, String sessionName, Integer workDuration, Integer breakDuration, Integer sessions, Boolean autoStart) {
        settings.setSessionName(sessionName);
        settings.setDefaultWorkDuration(workDuration);
        settings.setDefaultBreakDuration(breakDuration);
        settings.setSessions(sessions);
        settings.setAutoStart(autoStart);
        return settingsRepo.save(settings);
    }

    
}

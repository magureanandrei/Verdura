package com.verdura.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.verdura.DTOs.SessionSettingsDTO;
import com.verdura.Models.User;
import com.verdura.Models.UserSettings;
import com.verdura.Services.SettingsService;
import com.verdura.Services.UserService;

@RestController
@RequestMapping("/settings")
public class SettingsController {
    private final SettingsService settingsService;
    private final UserService userService;

    
    public SettingsController(SettingsService settingsService, UserService userService) {
        this.settingsService = settingsService;
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UserSettings> getAllSettings() {
        return settingsService.getAllSettings();
    }

    
    @PostMapping("/create/{userId}")
    public UserSettings createSettingsById(@PathVariable Long userId,
                                         @RequestBody SessionSettingsDTO settingsDTO) {
        
        User user = userService.getUserById(userId);
        UserSettings userSettings = new UserSettings();
        userSettings.setSessionName(settingsDTO.getSessionName());
        userSettings.setWorkDuration(settingsDTO.getWorkDuration());
        userSettings.setBreakDuration(settingsDTO.getBreakDuration());
        userSettings.setSessions(settingsDTO.getSessions());
        userSettings.setAutoStart(settingsDTO.getAutoStart());
        userSettings.setUser(user);
        List<UserSettings> settingsList = List.of(userSettings);
        user.setSettings(settingsList);                                    
        return settingsService.createSettings(userSettings);
        //this way means we'll have to send the user from frontend too
    }

    @GetMapping("/user/{userId}")
    public List<SessionSettingsDTO> getUserSettingsByUserId(@PathVariable Long userId) {
        List<UserSettings> userSettings = settingsService.getUserSettingsByUserId(userId);
        
        return userSettings.stream()
            .map(settings -> {
                SessionSettingsDTO dto = new SessionSettingsDTO();
                dto.setId(settings.getId().toString());
                dto.setSessionName(settings.getSessionName());
                dto.setWorkDuration(settings.getWorkDuration());
                dto.setBreakDuration(settings.getBreakDuration());
                dto.setSessions(settings.getSessions());
                dto.setAutoStart(settings.getAutoStart());
                return dto;
            })
            .toList();
    }

}

package com.verdura.Controllers;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
        userSettings.setDefaultWorkDuration(settingsDTO.getWorkDuration());
        userSettings.setDefaultBreakDuration(settingsDTO.getBreakDuration());
        userSettings.setSessions(settingsDTO.getSessions());
        userSettings.setAutoStart(settingsDTO.getAutoStart());
        userSettings.setUser(user);
        user.setSettings(userSettings);                                    
        return settingsService.createSettings(userSettings);
        //this way means we'll have to send the user from frontend too
    }

    @GetMapping("/user/{userId}")
    public UserSettings getUserSettingsByUserId(@PathVariable Long userId) {
        return settingsService.getUserSettingsByUserId(userId);
    }

    

}

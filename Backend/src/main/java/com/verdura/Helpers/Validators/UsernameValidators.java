package com.verdura.Helpers.Validators;

import org.springframework.stereotype.Component;

import com.verdura.Services.UserService;

@Component
public class UsernameValidators {
    private UserService userService;

    public UsernameValidators(UserService userService) {
        this.userService = userService;
    }
    
    public boolean isUniqueUsername(String username) {
        return !userService.existsByUsername(username);
    }

    public void validateUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (username.length() < 3) {
            throw new RuntimeException("Username must be at least 3 characters long");
        }
        if (!isUniqueUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
    }


}

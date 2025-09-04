package com.verdura.Helpers.Validators;

import org.springframework.stereotype.Component;

import com.verdura.Services.UserService;

@Component
public class EmailValidators {
    private UserService userService;
    public EmailValidators(UserService userService) {
        this.userService = userService;
    }
    public boolean isUniqueEmail(String email) {
        return !userService.existsByEmail(email);
    }
    public void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        if (!email.matches(emailRegex)) {
            throw new RuntimeException("Invalid email format");
        }
        if (!isUniqueEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
    }
    
}

package com.verdura.Controllers;

import com.verdura.Config.Security.JwtUtil;
import com.verdura.Models.User;
import com.verdura.Services.AuthService;
import com.verdura.Services.UserService;
import com.verdura.Services.DTOConverterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.verdura.DTOs.RegisterRequest;
import com.verdura.Helpers.Validators.PasswordValidators;
import com.verdura.Helpers.Validators.UsernameValidators;
import com.verdura.Helpers.Validators.EmailValidators;
import com.verdura.DTOs.LoginRequest;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final DTOConverterService dtoConverterService;
    private final PasswordValidators passwordValidators;
    private final UsernameValidators usernameValidators;
    private final EmailValidators emailValidators;
    

    @Autowired
    public AuthController(AuthService authService, 
                         UserService userService, 
                         JwtUtil jwtUtil, 
                         AuthenticationManager authenticationManager,
                         DTOConverterService dtoConverterService,
                         PasswordValidators passwordValidators,
                        UsernameValidators usernameValidators,
                        EmailValidators emailValidators) {
        this.authService = authService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.dtoConverterService = dtoConverterService;
        this.passwordValidators = passwordValidators;
        this.usernameValidators = usernameValidators;
        this.emailValidators = emailValidators;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.registerUser(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
            );
            
            // Generate JWT token just like in login
            UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities("ROLE_USER")
                .build();
            
            String token = jwtUtil.generateToken(userDetails);
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", dtoConverterService.convertToUserDTO(user));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );
            
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);
            User user = userService.getUserByUsername(userDetails.getUsername());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", dtoConverterService.convertToUserDTO(user));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    @PostMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            boolean isUnique = !usernameValidators.isUniqueUsername(username);
            return ResponseEntity.ok(isUnique);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            boolean isUnique = !emailValidators.isUniqueEmail(email);
            return ResponseEntity.ok(isUnique);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }
}

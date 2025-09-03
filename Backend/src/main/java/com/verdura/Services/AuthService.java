package com.verdura.Services;
import com.verdura.Models.User;
import com.verdura.Models.UserSettings;
import com.verdura.Models.Roles;
import com.verdura.Repos.RoleRepo;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.verdura.Helpers.Validators.PasswordValidators;
import com.verdura.Helpers.Validators.UsernameValidators;
import com.verdura.Helpers.Validators.EmailValidators;


@Service
public class AuthService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepository;
    private final PasswordValidators passwordValidators;
    private final UsernameValidators usernameValidators;
    private final EmailValidators emailValidators;

    @Autowired
    public AuthService(UserService userService,
                      PasswordEncoder passwordEncoder, 
                      RoleRepo roleRepository,
                      PasswordValidators passwordValidators,
                      UsernameValidators usernameValidators
                      , EmailValidators emailValidators) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.passwordValidators = passwordValidators;
        this.usernameValidators = usernameValidators;
        this.emailValidators = emailValidators;
    }


    @Transactional
    public User registerUser(String username, String email, String password) {
        usernameValidators.validateUsername(username);
        emailValidators.validateEmail(email);
        passwordValidators.validatePassword(password);
        String encodedPassword = passwordEncoder.encode(password);
        UserSettings userSettings = new UserSettings();
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(encodedPassword);

        // Set default role as ROLE_USER (ID: 1)
        Roles userRole = roleRepository.findById(1L)
            .orElseThrow(() -> new RuntimeException("Default user role not found"));
        user.setRole(userRole);

        user.setSettings(userSettings);
        userSettings.setUser(user);

        return userService.createUser(user);
    }

    public User loginUser(String username, String password) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    public void logout(HttpSession session) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            SecurityContextHolder.clearContext();
        }
        session.invalidate();
    }

    public void updateUserPassword(User user, String newPassword) throws RuntimeException {
        if(user == null || newPassword == null || newPassword.isEmpty()) {
            throw new RuntimeException("User or new password cannot be empty");
        }
        String encodedPassword = passwordEncoder.encode(newPassword);
        userService.updatePassword(user, encodedPassword);
    }

    public boolean checkCurrentPassword(User user, String currentPassword) throws RuntimeException {
        if (user == null || currentPassword == null || currentPassword.isEmpty()) {
            throw new RuntimeException("User or current password cannot be empty");
        }
        return passwordEncoder.matches(currentPassword, user.getPassword());
    }
}

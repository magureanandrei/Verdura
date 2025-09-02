package com.verdura.Services;

import com.verdura.Repos.UserRepo;
import com.verdura.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepo userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {

        if(!userRepository.existsById(user.getUserId())) {
            throw new RuntimeException("User not found");
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    public boolean existsByEmail(String email) {
        // Make sure email is trimmed and properly formatted
        if (email == null || email.trim().isEmpty()) {
            return false;
        }

        // Try both direct repository check and find method
        boolean exists = userRepository.existsByEmail(email.trim());
        User user = userRepository.findByEmail(email.trim());

        return exists || user != null;
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void updatePassword(User user, String newPassword) throws RuntimeException {
        if(user == null || newPassword == null || newPassword.isEmpty()) {
            throw new RuntimeException("User or new password cannot be empty");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public boolean checkCurrentPassword(User user, String currentPassword) throws RuntimeException {
        if (user == null || currentPassword == null || currentPassword.isEmpty()) {
            throw new RuntimeException("User or current password cannot be empty");
        }
        return passwordEncoder.matches(currentPassword, user.getPassword());
    }

}

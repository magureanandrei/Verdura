package com.verdura.Services;

import com.verdura.DTOs.UserDTO;
import com.verdura.Models.User;
import org.springframework.stereotype.Service;

@Service
public class DTOConverterService {
    
    public UserDTO convertToUserDTO(User user) {
        if (user == null) return null;
        
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        if (user.getRole() != null) {
            dto.setRoleId(user.getRole().getId());
        }
        return dto;
    }
}

package com.verdura.Controllers;

import com.verdura.Services.AuthService;
import com.verdura.Services.UserService;
import com.verdura.Models.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {


    private AuthService authService;
    private UserService userService;

    @Autowired
    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public String handleRegister(@RequestParam("username") String username,
                                 @RequestParam("email") String email,
                                 @RequestParam("password") String password,
                                 Model model) {
        try {
            authService.registerUser(username, email, password);
            return "redirect:/account-created";
        } catch (RuntimeException e) {
            model.addAttribute("username", username);
            model.addAttribute("email", email);
            model.addAttribute("error", e.getMessage());
            return "register";
        }
    }

    @PostMapping("/login")
    public String handleLogin(@RequestParam("username") String username,
                            @RequestParam("password") String password,
                            Model model, HttpSession session, RedirectAttributes redirectAttributes) {
            User user = userService.getUserByUsername(username);
        if (user == null || !userService.checkCurrentPassword(user, password)) {
            redirectAttributes.addFlashAttribute("loginError", "Invalid email or password.");
            return "redirect:/login";
        }
            User user1 = authService.loginUser(username, password);
            model.addAttribute("user", user1);
            session.setAttribute("user", user1);
            return "redirect:/pomodoro";

    }

}

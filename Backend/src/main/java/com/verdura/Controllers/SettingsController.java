package com.verdura.Controllers;

import com.verdura.Services.*;
import com.verdura.Models.User;
import com.verdura.Models.UserSettings;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
public class SettingsController {
    private AuthService authService;
    private UserService userService;
    private SettingsService settingsService;
    private SessionService sessionService;
    public SettingsController(AuthService authService, UserService userService, SettingsService settingsService, SessionService sessionService) {
        this.authService = authService;
        this.userService = userService;
        this.settingsService = settingsService;
        this.sessionService = sessionService;
    }

    @GetMapping("/settings")
    public String showSettingsPage(HttpSession session, Model model,
                                   @RequestParam(value = "tab", required = false, defaultValue = "general") String activeTab,
                                   @RequestParam(value = "message", required = false) String message,
                                   @RequestParam(value = "error", required = false) String error
                                   ) {
        if (session.getAttribute("user") == null) return "redirect:/login";
        User sessionUser = (User) session.getAttribute("user");
        User user = userService.getUserById(sessionUser.getUserId());
        UserSettings settings = settingsService.getUserSettingsByUserId(user.getUserId());
        model.addAttribute("settings", settings);
        model.addAttribute("message", message);
        model.addAttribute("error", error);
        model.addAttribute("activeTab", activeTab);
        return "settings";
    }

    @PostMapping("/settings/update-timer")
    public String updateTimerSettings(HttpSession session,
                                      @RequestParam Integer workDuration,
                                      @RequestParam Integer breakDuration,
                                      @RequestParam Integer longBreakDuration,
                                      @RequestParam Integer sessionsUntilLongBreak, RedirectAttributes redirectAttributes)
    {
        if(session.getAttribute("user") == null) return "redirect:/login";
        User user = (User) session.getAttribute("user");
        UserSettings settings = settingsService.getUserSettingsByUserId(user.getUserId());
        settingsService.updateDefaultSettings(settings, workDuration, breakDuration, longBreakDuration, sessionsUntilLongBreak);
        user.setSettings(settings);
        userService.updateUser(user);
        redirectAttributes.addFlashAttribute("message", "Settings updated successfully");
        return "redirect:/settings?success";
    }

    @PostMapping("settings/change-password")
    public String changePassword(HttpSession session,
                                 @RequestParam String oldPassword,
                                 @RequestParam String newPassword, RedirectAttributes redirectAttributes)
    {
        if(session.getAttribute("user") == null) return "redirect:/login";

        User sessionUser = (User) session.getAttribute("user");
        User user = userService.getUserById(sessionUser.getUserId());

        if(!userService.checkCurrentPassword(user, oldPassword)) {
            redirectAttributes.addFlashAttribute("error", "Failed to change password. Current password is incorrect.");
            redirectAttributes.addFlashAttribute("activeTab","account");
            return "redirect:/settings?activeTab=account&message=Incorrect+current+password.";
        }

        if (newPassword.length() < 8) {
            redirectAttributes.addFlashAttribute("error", "New password must be at least 8 characters.");
            redirectAttributes.addFlashAttribute("activeTab", "account");
            return "redirect:/settings?activeTab=account&message=Password+must+be+at+least+8+characters.";
        }

        userService.updatePassword(user, newPassword);
        redirectAttributes.addFlashAttribute("message", "Password changed successfully");
        redirectAttributes.addFlashAttribute("activeTab","account");
        return "redirect:/settings?activeTab-account&message=Password+changed+successfully";



    }

    @PostMapping("settings/delete-account")
    public String deleteAccount(HttpSession session, RedirectAttributes redirectAttributes){
        if(session.getAttribute("user")==null) return "redirect:/login";
        User sessionUser = (User) session.getAttribute("user");
        User user = userService.getUserById(sessionUser.getUserId());
        settingsService.deleteSettings(settingsService.getUserSettingsByUserId(user.getUserId()));
        sessionService.deleteAllSessionsByUser(user);
        userService.deleteUser(user);
        authService.logout(session);
        redirectAttributes.addFlashAttribute("message", "Account deleted successfully");
        return "redirect:/index?accountDeleted";
    }

}

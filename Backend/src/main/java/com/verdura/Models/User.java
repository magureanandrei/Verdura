package com.verdura.Models;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, unique = true)
    private String email;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Roles role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PomodoroSession> sessions= new ArrayList<>();
    @OneToOne(mappedBy ="user", cascade = CascadeType.ALL)
    private UserSettings settings;

    public User() {}

    public User(String username, String password, String email, List<PomodoroSession> sessions, UserSettings settings) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.sessions = sessions;
        this.settings = settings;
    }

    public Long getUserId() {
        return id;
    }

    public void setUserId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<PomodoroSession> getSessions() {
        return sessions;
    }

    public void setSessions(List<PomodoroSession> sessions) {
        this.sessions = sessions;
    }

    public UserSettings getSettings() {
        return settings;
    }

    public void setSettings(UserSettings settings) {
        this.settings = settings;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", sessions=" + sessions +
                ", settings=" + settings +
                '}';
    }
}

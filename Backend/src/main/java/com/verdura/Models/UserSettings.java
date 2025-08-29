package com.verdura.Models;


import jakarta.persistence.*;

@Entity
@Table(name = "pomodoro_settings")
public class UserSettings{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "settings_id", nullable = false, unique = true)
    Long id;
    @Column(name = "default_work_duration", nullable = false)
    private Integer defaultWorkDuration = 25;
    @Column(name = "default_break_duration", nullable = false)
    private Integer defaultBreakDuration = 5;
    @Column(name = "default_long_break_duration", nullable = false)
    private Integer defaultLongBreakDuration = 15;
    @Column(name = "pomodoros_until_long_break", nullable = false)
    private Integer sessionsUntilLongBreak = 4;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    public UserSettings() {}

    public UserSettings( Integer defaultWorkDuration, Integer defaultBreakDuration, Integer defaultLongBreakDuration, Integer sessionsUntilLongBreak, User user) {
        this.defaultWorkDuration = defaultWorkDuration;
        this.defaultBreakDuration = defaultBreakDuration;
        this.defaultLongBreakDuration = defaultLongBreakDuration;
        this.sessionsUntilLongBreak = sessionsUntilLongBreak;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDefaultWorkDuration() {
        return defaultWorkDuration;
    }

    public void setDefaultWorkDuration(Integer defaultWorkDuration) {
        this.defaultWorkDuration = defaultWorkDuration;
    }

    public Integer getDefaultBreakDuration() {
        return defaultBreakDuration;
    }

    public void setDefaultBreakDuration(Integer defaultBreakDuration) {
        this.defaultBreakDuration = defaultBreakDuration;
    }

    public Integer getDefaultLongBreakDuration() {
        return defaultLongBreakDuration;
    }

    public void setDefaultLongBreakDuration(Integer defaultLongBreakDuration) {
        this.defaultLongBreakDuration = defaultLongBreakDuration;
    }

    public Integer getSessionsUntilLongBreak() {
        return sessionsUntilLongBreak;
    }

    public void setSessionsUntilLongBreak(Integer sessionsUntilLongBreak) {
        this.sessionsUntilLongBreak = sessionsUntilLongBreak;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserSettings{" +
                "id=" + id +
                ", defaultWorkDuration=" + defaultWorkDuration +
                ", defaultBreakDuration=" + defaultBreakDuration +
                ", defaultLongBreakDuration=" + defaultLongBreakDuration +
                ", sessionsUntilLongBreak=" + sessionsUntilLongBreak +
                ", user=" + user +
                '}';
    }
}

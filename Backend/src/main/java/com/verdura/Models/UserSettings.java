package com.verdura.Models;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "pomodoro_settings")
public class UserSettings{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "settings_id", nullable = false, unique = true)
    Long id;
    @Column(name = "session_name", nullable = false)
    private String sessionName;
    @Column(name = "work_duration", nullable = false)
    private Integer workDuration;
    @Column(name = "break_duration", nullable = false)
    private Integer breakDuration;
    @Column(name = "sessions", nullable = false)
    private Integer sessions;
    @Column(name = "auto_start", nullable = false)
    private Boolean autoStart;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    User user;

    public UserSettings() {}

    public UserSettings( String sessionName, Integer workDuration, Integer breakDuration, Integer sessions,Boolean autoStart, User user) {
        this.sessionName = sessionName;
        this.workDuration = workDuration;
        this.breakDuration = breakDuration;
        this.sessions=sessions;
        this.autoStart=autoStart;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getSessionName() {
        return sessionName;
    }
    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public Integer getWorkDuration() {
        return workDuration;
    }

    public void setDefaultWorkDuration(Integer defaultWorkDuration) {
        this.workDuration = defaultWorkDuration;
    }

    public Integer getDefaultBreakDuration() {
        return breakDuration;
    }

    public void setDefaultBreakDuration(Integer defaultBreakDuration) {
        this.breakDuration = defaultBreakDuration;
    }

    public Integer getSessions() {
        return sessions;
    }

    public void setSessions(Integer sessions) {
        this.sessions = sessions;
    }

    public Boolean getAutoStart() {
        return autoStart;
    }

    public void setAutoStart(Boolean autoStart) {
        this.autoStart = autoStart;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "UserSettings [id=" + id +  ", sessionName=" + sessionName +
        ", workDuration=" + workDuration + ", breakDuration=" + breakDuration
                + ", sessions=" + sessions + ", autoStart=" + autoStart + ", user=" + user + "]";
    }
}

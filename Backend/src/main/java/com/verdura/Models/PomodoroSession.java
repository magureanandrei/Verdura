package com.verdura.Models;


import jakarta.persistence.*;

@Entity
@Table(name = "pomodoro_sessions")
public class PomodoroSession{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id", nullable = false, unique = true)
    Long sessionId;
    @Column(nullable = false)
    Integer workDuration; // in minutes
    @Column(nullable = false)
    Integer breakDuration; // in minutes
    @Column(nullable = false)
    Integer completedSessions;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    SessionStatus status;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    public PomodoroSession() {}

    public PomodoroSession(Integer workDuration, Integer breakDuration, Integer completedSessions, SessionStatus status, User user) {
        this.workDuration = workDuration;
        this.breakDuration = breakDuration;
        this.completedSessions = completedSessions;
        this.status = status;
        this.user = user;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public Integer getWorkDuration() {
        return workDuration;
    }

    public void setWorkDuration(Integer workDuration) {
        this.workDuration = workDuration;
    }

    public Integer getBreakDuration() {
        return breakDuration;
    }

    public void setBreakDuration(Integer breakDuration) {
        this.breakDuration = breakDuration;
    }

    public Integer getCompletedSessions() {
        return completedSessions;
    }

    public void setCompletedSessions(Integer completedSessions) {
        this.completedSessions = completedSessions;
    }

    public SessionStatus getStatus() {
        return status;
    }

    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "PomodoroSession{" +
                "sessionId=" + sessionId +
                ", workDuration=" + workDuration +
                ", breakDuration=" + breakDuration +
                ", completedSessions=" + completedSessions +
                ", status=" + status +
                ", user=" + user +
                '}';
    }
}

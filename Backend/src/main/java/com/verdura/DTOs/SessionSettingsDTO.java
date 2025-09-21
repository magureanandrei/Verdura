package com.verdura.DTOs;

public class SessionSettingsDTO {
    private String id;
    private String sessionName;
    private Integer workDuration;
    private Integer breakDuration;
    private Integer sessions;
    private Boolean autoStart;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getSessionName() { return sessionName; }
    public void setSessionName(String sessionName) { this.sessionName = sessionName; }

    public Integer getWorkDuration() { return workDuration; }
    public void setWorkDuration(Integer workDuration) { this.workDuration = workDuration; }

    public Integer getBreakDuration() { return breakDuration; }
    public void setBreakDuration(Integer breakDuration) { this.breakDuration = breakDuration; }

    public Integer getSessions() { return sessions; }
    public void setSessions(Integer sessions) { this.sessions = sessions; }

    public Boolean getAutoStart() { return autoStart; }
    public void setAutoStart(Boolean autoStart) { this.autoStart = autoStart; }
}

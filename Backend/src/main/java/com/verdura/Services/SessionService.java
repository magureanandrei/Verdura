package com.verdura.Services;

import com.verdura.Repos.SessionRepo;
import com.verdura.Models.PomodoroSession;
import com.verdura.Models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {
    private final SessionRepo sessionRepository;
    public SessionService(SessionRepo sessionRepository, UserService userService) {
        this.sessionRepository = sessionRepository;
    }

    public PomodoroSession createSession(PomodoroSession session) {
        return sessionRepository.save(session);
    }

    public PomodoroSession getSessionById(Long id) {
        return sessionRepository.findById(id).orElse(null);
    }

    public void updateSession(PomodoroSession session) {
        sessionRepository.save(session);
    }

    public void deleteSession(Long id) {
        sessionRepository.deleteById(id);
    }

    public void deleteSession(PomodoroSession session) {
        sessionRepository.delete(session);
    }

    public List<PomodoroSession> getAllSessions() {
        return sessionRepository.findAll();
    }

    public List<PomodoroSession> getSessionsByUser(Long userId) {
        return sessionRepository.findByUser_Id(userId);
    }

    public Integer getTotalCompletedPomodoros(Long userId) {
        return sessionRepository.getTotalCompletedPomodoros(userId);
    }

    public void deleteAllSessionsByUser(User user) {
        sessionRepository.deleteAllByUser(user);
    }

}

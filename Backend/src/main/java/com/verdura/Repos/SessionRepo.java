package com.verdura.Repos;

import com.verdura.Models.PomodoroSession;
import com.verdura.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SessionRepo extends JpaRepository<PomodoroSession, Long> {
    List<PomodoroSession> findByUser_Id(Long id);
    @Query("SELECT SUM(ps.completedSessions) FROM PomodoroSession ps WHERE ps.user.id = :id")
    Integer getTotalCompletedPomodoros(@Param("id") Long id);
    PomodoroSession findTopByOrderBySessionIdDesc();
    void deleteAllByUser(User user);
}

package com.energy.app.repo;

import com.energy.app.model.MeterReading;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface MeterReadingRepository extends JpaRepository<MeterReading, Long> {
  List<MeterReading> findByUserIdOrderByTimestampAsc(Long userId);

  @Query("select m from MeterReading m where m.userId = ?1 and m.timestamp between ?2 and ?3 order by m.timestamp asc")
  List<MeterReading> findForUserBetween(Long userId, Instant start, Instant end);
}

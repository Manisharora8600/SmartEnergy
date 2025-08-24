package com.energy.app.repo;

import com.energy.app.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
  List<Bill> findByUserIdOrderByPeriodStartDesc(Long userId);
}

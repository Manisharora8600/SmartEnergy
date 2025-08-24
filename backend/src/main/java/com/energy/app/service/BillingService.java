package com.energy.app.service;

import com.energy.app.model.Bill;
import com.energy.app.model.MeterReading;
import com.energy.app.repo.BillRepository;
import com.energy.app.repo.MeterReadingRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class BillingService {
  private final MeterReadingRepository readings; private final BillRepository bills;
  public BillingService(MeterReadingRepository readings, BillRepository bills) { this.readings = readings; this.bills = bills; }

  public Bill generateBill(Long userId, Instant start, Instant end) {
    List<MeterReading> rs = readings.findForUserBetween(userId, start, end);
    double totalKwh = rs.stream().mapToDouble(MeterReading::getKwh).sum();
    double amount = Math.round(totalKwh * 7.5 * 100.0)/100.0; // ₹7.5/kWh
    Bill bill = new Bill(userId, start, end, amount);
    return bills.save(bill);
  }
}

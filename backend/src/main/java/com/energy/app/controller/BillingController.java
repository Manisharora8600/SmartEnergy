package com.energy.app.controller;

import com.energy.app.model.Bill;
import com.energy.app.repo.BillRepository;
import com.energy.app.security.SecurityUtil;
import com.energy.app.service.BillingService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController @RequestMapping("/api/billing")
public class BillingController {
  private final BillingService service; private final BillRepository repo; private final SecurityUtil sec;
  public BillingController(BillingService service, BillRepository repo, SecurityUtil sec) { this.service = service; this.repo = repo; this.sec = sec; }

  @PostMapping("/generate") @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public Bill generate(@RequestParam Long userId,
                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant periodStart,
                       @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant periodEnd) {
    if (!sec.isAdmin()) userId = sec.currentUserId();
    return service.generateBill(userId, periodStart, periodEnd);
  }

  @GetMapping @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public List<Bill> list(@RequestParam Long userId) {
    if (!sec.isAdmin()) userId = sec.currentUserId();
    return repo.findByUserIdOrderByPeriodStartDesc(userId);
  }

  @PostMapping("/mark-paid/{billId}") @PreAuthorize("hasRole('ADMIN')")
  public Map<String,Object> markPaid(@PathVariable Long billId) {
    var b = repo.findById(billId).orElseThrow();
    b.setStatus(Bill.Status.PAID);
    repo.save(b);
    return Map.of("status","ok","billId",billId);
  }
}

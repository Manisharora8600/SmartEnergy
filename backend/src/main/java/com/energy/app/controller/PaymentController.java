package com.energy.app.controller;

import com.energy.app.model.Bill;
import com.energy.app.repo.BillRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController @RequestMapping("/api/payments")
public class PaymentController {
  private final BillRepository bills;
  public PaymentController(BillRepository bills) { this.bills = bills; }

  @PostMapping("/pay") @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public Map<String,Object> mockPay(@RequestParam Long billId) {
    Bill b = bills.findById(billId).orElseThrow();
    b.setStatus(Bill.Status.PAID);
    bills.save(b);
    return Map.of("status","PAID","billId", billId);
  }
}

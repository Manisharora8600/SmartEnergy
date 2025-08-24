package com.energy.app.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Bill {
  public enum Status { DUE, PAID }

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long userId;
  private Instant periodStart;
  private Instant periodEnd;
  private Double amount;
  @Enumerated(EnumType.STRING)
  private Status status = Status.DUE;

  public Bill() {}
  public Bill(Long userId, Instant start, Instant end, Double amount) {
    this.userId = userId; this.periodStart = start; this.periodEnd = end; this.amount = amount;
  }

  public Long getId() { return id; }
  public Long getUserId() { return userId; }
  public void setUserId(Long userId) { this.userId = userId; }
  public Instant getPeriodStart() { return periodStart; }
  public void setPeriodStart(Instant periodStart) { this.periodStart = periodStart; }
  public Instant getPeriodEnd() { return periodEnd; }
  public void setPeriodEnd(Instant periodEnd) { this.periodEnd = periodEnd; }
  public Double getAmount() { return amount; }
  public void setAmount(Double amount) { this.amount = amount; }
  public Status getStatus() { return status; }
  public void setStatus(Status status) { this.status = status; }
}

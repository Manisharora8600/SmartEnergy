package com.energy.app.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class MeterReading {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long userId;
  private Double kwh;
  private Instant timestamp;

  public MeterReading() {}
  public MeterReading(Long userId, Double kwh, Instant timestamp) {
    this.userId = userId; this.kwh = kwh; this.timestamp = timestamp;
  }

  public Long getId() { return id; }
  public Long getUserId() { return userId; }
  public void setUserId(Long userId) { this.userId = userId; }
  public Double getKwh() { return kwh; }
  public void setKwh(Double kwh) { this.kwh = kwh; }
  public Instant getTimestamp() { return timestamp; }
  public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}

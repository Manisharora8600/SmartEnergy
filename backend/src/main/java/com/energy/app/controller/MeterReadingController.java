package com.energy.app.controller;

import com.energy.app.model.MeterReading;
import com.energy.app.repo.MeterReadingRepository;
import com.energy.app.security.SecurityUtil;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController @RequestMapping("/api/readings")
public class MeterReadingController {
  private final MeterReadingRepository repo; private final SecurityUtil sec;
  public MeterReadingController(MeterReadingRepository repo, SecurityUtil sec) { this.repo = repo; this.sec = sec; }

  @PostMapping @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public MeterReading ingest(@RequestBody Map<String, Object> body) {
    Long userId = ((Number) body.get("userId")).longValue();
    if (!sec.isAdmin()) userId = sec.currentUserId(); // force to self
    Double kwh = ((Number) body.get("kwh")).doubleValue();
    Instant ts = body.get("timestamp")!=null? Instant.parse(body.get("timestamp").toString()): Instant.now();
    return repo.save(new MeterReading(userId, kwh, ts));
  }

  @GetMapping @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public List<MeterReading> list(@RequestParam Long userId,
                                 @RequestParam(required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
                                 @RequestParam(required=false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {
    if (!sec.isAdmin()) userId = sec.currentUserId();
    if (from != null && to != null) return repo.findForUserBetween(userId, from, to);
    return repo.findByUserIdOrderByTimestampAsc(userId);
  }

  @GetMapping("/summary") @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public Map<String,Object> summary(@RequestParam Long userId) {
    if (!sec.isAdmin()) userId = sec.currentUserId();
    var list = repo.findByUserIdOrderByTimestampAsc(userId);
    double total = list.stream().mapToDouble(MeterReading::getKwh).sum();
    Map<String,Object> m = new HashMap<>(); m.put("totalKwh", total); m.put("count", list.size());
    return m;
  }
}

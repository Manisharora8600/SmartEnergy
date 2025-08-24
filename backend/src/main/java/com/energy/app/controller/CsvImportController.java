package com.energy.app.controller;

import com.energy.app.model.MeterReading;
import com.energy.app.repo.MeterReadingRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@RestController @RequestMapping("/api/readings/import")
public class CsvImportController {
  private final MeterReadingRepository repo;
  public CsvImportController(MeterReadingRepository repo) { this.repo = repo; }

  @PostMapping @PreAuthorize("hasRole('ADMIN')")
  public List<MeterReading> importCsv(@RequestParam("file") MultipartFile file) throws Exception {
    List<MeterReading> saved = new ArrayList<>();
    try (var reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
      String line; boolean header = true;
      while ((line = reader.readLine()) != null) {
        if (header) { header = false; continue; }
        if (line.isBlank()) continue;
        String[] p = line.split(",");
        Long userId = Long.parseLong(p[0].trim());
        Double kwh = Double.parseDouble(p[1].trim());
        Instant ts = p.length>2 && !p[2].isBlank()? Instant.parse(p[2].trim()) : Instant.now();
        saved.add(repo.save(new MeterReading(userId, kwh, ts)));
      }
    }
    return saved;
  }
}

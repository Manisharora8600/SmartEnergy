package com.energy.app.controller;

import com.energy.app.dto.AuthDtos;
import com.energy.app.model.UserAccount;
import com.energy.app.repo.UserRepository;
import com.energy.app.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController @RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository users; private final PasswordEncoder encoder; private final JwtUtil jwt;
  public AuthController(UserRepository users, PasswordEncoder encoder, JwtUtil jwt) { this.users = users; this.encoder = encoder; this.jwt = jwt; }

  @PostMapping("/register")
  public Map<String,Object> register(@RequestBody AuthDtos.RegisterRequest req) {
    if (users.findByEmail(req.email).isPresent()) return Map.of("error","Email already exists");
    var ua = new UserAccount(req.email, encoder.encode(req.password), "USER");
    users.save(ua);
    String token = jwt.generateToken(ua.getEmail(), Map.of("uid", ua.getId(), "role", ua.getRole()));
    return Map.of("token", token, "userId", ua.getId(), "email", ua.getEmail(), "role", ua.getRole());
  }

  @PostMapping("/login")
  public Object login(@RequestBody AuthDtos.LoginRequest req) {
    var user = users.findByEmail(req.email).orElse(null);
    if (user == null) return Map.of("error","Invalid credentials");
    if (!encoder.matches(req.password, user.getPasswordHash())) return Map.of("error","Invalid credentials");
    String token = jwt.generateToken(user.getEmail(), Map.of("uid", user.getId(), "role", user.getRole()));
    var resp = new AuthDtos.LoginResponse(); resp.token=token; resp.userId=user.getId(); resp.email=user.getEmail(); resp.role=user.getRole();
    return resp;
  }
}

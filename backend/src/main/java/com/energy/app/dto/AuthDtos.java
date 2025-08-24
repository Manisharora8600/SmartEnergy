package com.energy.app.dto;
public class AuthDtos {
  public static class RegisterRequest { public String email; public String password; }
  public static class LoginRequest { public String email; public String password; }
  public static class LoginResponse { public String token; public Long userId; public String email; public String role; }
}

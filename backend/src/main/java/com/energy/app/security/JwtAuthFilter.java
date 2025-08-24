package com.energy.app.security;

import com.energy.app.repo.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {

  private final JwtUtil jwt;
  private final UserRepository users;

  public JwtAuthFilter(JwtUtil jwt, UserRepository users) {
    this.jwt = jwt;
    this.users = users;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    String auth = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (auth != null && auth.startsWith("Bearer ")) {
      String token = auth.substring(7);
      try {
        String email = jwt.validateAndGetSubject(token);
        var user = users.findByEmail(email).orElse(null);
        if (user != null) {
          var authToken = new UsernamePasswordAuthenticationToken(
              email, null, List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
          );
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
      } catch (Exception ignored) {}
    }
    chain.doFilter(request, response);
  }
}

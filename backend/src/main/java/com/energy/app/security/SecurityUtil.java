package com.energy.app.security;

import com.energy.app.model.UserAccount;
import com.energy.app.repo.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {
  private final UserRepository users;
  public SecurityUtil(UserRepository users) { this.users = users; }

  public boolean isAdmin() {
    Authentication a = SecurityContextHolder.getContext().getAuthentication();
    if (a == null) return false;
    for (GrantedAuthority ga : a.getAuthorities()) {
      if ("ROLE_ADMIN".equals(ga.getAuthority())) return true;
    }
    return false;
  }
  public Long currentUserId() {
    Authentication a = SecurityContextHolder.getContext().getAuthentication();
    if (a == null) return null;
    String email = (String) a.getPrincipal();
    if (email == null) return null;
    UserAccount ua = users.findByEmail(email).orElse(null);
    return ua != null ? ua.getId() : null;
  }
}

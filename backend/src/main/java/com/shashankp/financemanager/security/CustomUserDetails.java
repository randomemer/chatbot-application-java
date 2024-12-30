package com.shashankp.financemanager.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shashankp.financemanager.model.User;
import java.util.Collection;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
public class CustomUserDetails implements UserDetails {
  private Long id;
  private String username;
  private String password;
  private Collection<? extends GrantedAuthority> authorities;

  @JsonIgnore private User user;

  public CustomUserDetails(User user) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.password = user.getPassword();
    this.authorities = user.getAuthorities();

    this.user = user;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}

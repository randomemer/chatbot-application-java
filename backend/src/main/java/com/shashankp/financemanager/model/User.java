package com.shashankp.financemanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Entity
@Data
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String username;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Column(nullable = false)
  private String password;

  @JsonIgnore
  @OneToMany(
      mappedBy = "user",
      cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE},
      fetch = FetchType.EAGER,
      orphanRemoval = true)
  private List<Role> roles = new ArrayList<>();

  @JsonBackReference(value = "user-expenses")
  @OneToMany(mappedBy = "user")
  private List<Expense> expenses;

  @JsonBackReference(value = "user-incomes")
  @OneToMany(mappedBy = "user")
  private List<Income> incomes;

  @JsonBackReference(value = "user-budgets")
  @OneToMany(mappedBy = "user")
  private List<Budget> budgets;

  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles.stream()
        .map(role -> new SimpleGrantedAuthority(role.getRole().toString()))
        .collect(Collectors.toSet());
  }

  public void addRole(Role role) {
    role.setUser(this);
    this.roles.add(role);
  }
}

package com.shashankp.financemanager.model;

import com.shashankp.financemanager.enumeration.RoleEnum;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(value = EnumType.STRING)
  @Column(nullable = false)
  private RoleEnum role;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  public Role(RoleEnum roleEnum) {
    this.role = roleEnum;
  }
}

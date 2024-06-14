package com.shashankp.financemanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private double amount;

  @ManyToOne
  @JoinColumn(name = "category_id", unique = true)
  private ExpenseCategory category;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
}

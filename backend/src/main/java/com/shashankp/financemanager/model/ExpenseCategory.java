package com.shashankp.financemanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.List;
import lombok.Data;

@Entity
@Data
public class ExpenseCategory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @JsonBackReference(value = "expense-category")
  @OneToMany(
      mappedBy = "category",
      cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  private List<Expense> expenses;

  @JsonBackReference(value = "expense-category-budget")
  @OneToMany(
      mappedBy = "category",
      cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE},
      orphanRemoval = true)
  private List<Budget> budgets;
}

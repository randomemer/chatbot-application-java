package com.shashankp.financemanager.dto;

import com.shashankp.financemanager.model.ExpenseCategory;
import com.shashankp.financemanager.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BudgetSummaryDTO {
  private Long id;
  private Double budget_limit;
  private Double total_expenses;
  private User user;
  private ExpenseCategory expense_category;
}

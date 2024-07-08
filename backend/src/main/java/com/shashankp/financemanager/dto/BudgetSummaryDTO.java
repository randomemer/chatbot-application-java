package com.shashankp.financemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BudgetSummaryDTO {
  private Long id;
  private Long user_id;
  private Double budget_limit;
  private Long category_id;
  private String category_name;
  private Double total_expenses;
}

package com.shashankp.financemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseInputDTO {
  private Double amount;
  private String description;
  private String date;
  private Long category_id;
}

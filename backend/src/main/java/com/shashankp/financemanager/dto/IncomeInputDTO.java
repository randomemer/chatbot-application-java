package com.shashankp.financemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomeInputDTO {
  private Double amount;
  private String source;
  private String date;
}

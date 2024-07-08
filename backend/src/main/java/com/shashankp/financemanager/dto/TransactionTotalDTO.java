package com.shashankp.financemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionTotalDTO {
  private Double amount;
  private int month;
  private int year;
}

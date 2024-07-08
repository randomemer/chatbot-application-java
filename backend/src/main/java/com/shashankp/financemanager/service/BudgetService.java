package com.shashankp.financemanager.service;

import com.shashankp.financemanager.dto.BudgetSummaryDTO;
import com.shashankp.financemanager.model.Budget;
import com.shashankp.financemanager.repository.BudgetRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BudgetService {
  @Autowired private BudgetRepository budgetRepository;

  public Budget saveBudget(Budget budget) {
    return budgetRepository.save(budget);
  }

  public List<Budget> getBudgetsByUserId(Long id) {
    return budgetRepository.findByUserId(id);
  }

  public List<BudgetSummaryDTO> getBudgetSummary(Long userId, int month, int year) {
    return budgetRepository.getBudgetSummary(userId, month, year);
  }
}

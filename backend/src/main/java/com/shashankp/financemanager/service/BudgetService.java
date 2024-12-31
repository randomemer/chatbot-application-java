package com.shashankp.financemanager.service;

import com.shashankp.financemanager.dto.BudgetInputDTO;
import com.shashankp.financemanager.dto.BudgetSummaryDTO;
import com.shashankp.financemanager.model.Budget;
import com.shashankp.financemanager.model.ExpenseCategory;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.repository.BudgetRepository;
import com.shashankp.financemanager.repository.ExpenseCategoryRepository;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class BudgetService {
  @Autowired private BudgetRepository budgetRepository;
  @Autowired private ExpenseCategoryRepository categoryRepository;
  @Autowired private ModelMapper modelMapper;

  public Budget saveBudget(Budget budget) {
    return budgetRepository.save(budget);
  }

  public Budget saveBudget(Budget budget, BudgetInputDTO budgetInput) {
    if (budgetInput.getAmount() != null) {
      budget.setAmount(budgetInput.getAmount());
    }

    Long categoryId = budgetInput.getCategory_id();
    if (categoryId != null) {
      Optional<ExpenseCategory> categoryOptional = categoryRepository.findById(categoryId);
      if (categoryOptional.isEmpty()) {
        throw new ResourceNotFoundException(
            "Expense category with id = " + categoryId + " does not exist.");
      }
      budget.setCategory(categoryOptional.get());
    }

    return saveBudget(budget);
  }

  public Budget createBudget(BudgetInputDTO budgetInput, User user) {
    Budget budget = modelMapper.map(budgetInput, Budget.class);
    budget.setUser(user);

    return saveBudget(budget, budgetInput);
  }

  public List<Budget> getBudgetsByUserId(Long id) {
    return budgetRepository.findByUserId(id);
  }

  public List<BudgetSummaryDTO> getBudgetSummary(Long userId, int month, int year) {
    return budgetRepository.getBudgetSummary(userId, month, year);
  }

  public void deleteBudget(Long id) {
    budgetRepository.deleteById(id);
  }
}

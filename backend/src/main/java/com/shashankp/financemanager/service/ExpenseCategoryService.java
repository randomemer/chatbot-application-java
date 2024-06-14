package com.shashankp.financemanager.service;

import com.shashankp.financemanager.model.ExpenseCategory;
import com.shashankp.financemanager.repository.ExpenseCategoryRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseCategoryService {
  @Autowired private ExpenseCategoryRepository expenseCategoryRepository;

  public List<ExpenseCategory> findExpenseCategories() {
    return expenseCategoryRepository.findAll();
  }

  public ExpenseCategory saveExpenseCategory(ExpenseCategory expenseCategory) {
    return expenseCategoryRepository.save(expenseCategory);
  }
}

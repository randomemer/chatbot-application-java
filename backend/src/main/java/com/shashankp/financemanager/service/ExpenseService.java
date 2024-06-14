package com.shashankp.financemanager.service;

import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
  @Autowired private ExpenseRepository expenseRepository;

  public Expense saveExpense(Expense expense) {
    return expenseRepository.save(expense);
  }

  public List<Expense> getExpensesByUserId(Long id) {
    return expenseRepository.findByUserId(id);
  }
}

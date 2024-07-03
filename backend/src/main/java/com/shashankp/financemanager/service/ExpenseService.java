package com.shashankp.financemanager.service;

import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.model.dto.TransactionTotalDTO;
import com.shashankp.financemanager.repository.ExpenseRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {
  @Autowired private ExpenseRepository expenseRepository;

  public Expense saveExpense(Expense expense) {
    return expenseRepository.save(expense);
  }

  public List<Expense> getExpensesByUserId(Long id) {
    return expenseRepository.findByUserId(id);
  }

  public TransactionTotalDTO getTotalExpensesForMonth(Long userId, int month, int year) {
    return expenseRepository.findTotalForMonth(userId, month, year);
  }
}

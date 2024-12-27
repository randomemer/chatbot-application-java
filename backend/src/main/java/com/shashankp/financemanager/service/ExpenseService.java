package com.shashankp.financemanager.service;

import com.shashankp.financemanager.dto.TransactionTotalDTO;
import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.repository.ExpenseRepository;
import java.util.List;
import java.util.Optional;
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
    Optional<TransactionTotalDTO> totalForMonth =
        expenseRepository.findTotalForMonth(userId, month, year);

    return totalForMonth.orElse(new TransactionTotalDTO(0.0, month, year));
  }
}

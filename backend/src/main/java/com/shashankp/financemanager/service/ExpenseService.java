package com.shashankp.financemanager.service;

import com.shashankp.financemanager.dto.ExpenseInputDTO;
import com.shashankp.financemanager.dto.TransactionTotalDTO;
import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.model.ExpenseCategory;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.repository.ExpenseCategoryRepository;
import com.shashankp.financemanager.repository.ExpenseRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ExpenseService {
  @Autowired private ExpenseRepository expenseRepository;
  @Autowired private ExpenseCategoryRepository expenseCategoryRepository;
  @Autowired private ModelMapper modelMapper;

  public List<Expense> getExpensesByUserId(Long id) {
    return expenseRepository.findByUserId(id);
  }

  public TransactionTotalDTO getTotalExpensesForMonth(Long userId, int month, int year) {
    Optional<TransactionTotalDTO> totalForMonth =
        expenseRepository.findTotalForMonth(userId, month, year);

    return totalForMonth.orElse(new TransactionTotalDTO(0.0, month, year));
  }

  public Expense saveExpense(Expense expense) {
    return expenseRepository.save(expense);
  }

  public Expense saveExpense(Expense expense, ExpenseInputDTO expenseInput) {
    if (expenseInput.getAmount() != null) {
      expense.setAmount(expenseInput.getAmount());
    }

    if (expenseInput.getDescription() != null) {
      expense.setDescription(expenseInput.getDescription());
    }

    if (expenseInput.getDate() != null) {
      LocalDate date = LocalDate.parse(expenseInput.getDate());
      expense.setDate(date);
    }

    // Check valid expense category
    Long categoryId = expenseInput.getCategory_id();
    if (categoryId != null) {
      Optional<ExpenseCategory> expenseCategoryOptional =
          expenseCategoryRepository.findById(categoryId);
      if (expenseCategoryOptional.isEmpty()) {
        throw new ResourceNotFoundException(
            "Expense category with id = " + categoryId + " does not exist.");
      }
      expense.setCategory(expenseCategoryOptional.get());
    }

    return saveExpense(expense);
  }

  @Transactional
  public Expense createExpense(ExpenseInputDTO expenseInputDTO, User user) {
    Expense expense = modelMapper.map(expenseInputDTO, Expense.class);
    expense.setUser(user);

    return saveExpense(expense, expenseInputDTO);
  }

  public void deleteExpense(Long id) {
    expenseRepository.deleteById(id);
  }
}

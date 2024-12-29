package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.dto.ExpenseInputDTO;
import com.shashankp.financemanager.dto.TransactionTotalDTO;
import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.service.ExpenseService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
  @Autowired private ExpenseService expenseService;

  @PostMapping
  public ResponseEntity<Expense> createExpense(
      @RequestBody ExpenseInputDTO expenseInputDTO, @AuthenticationPrincipal User user) {
    Expense savedExpense = expenseService.createExpense(expenseInputDTO, user);

    return ResponseEntity.ok(savedExpense);
  }

  @GetMapping
  public List<Expense> getExpensesByUserId(@AuthenticationPrincipal User user) {
    return expenseService.getExpensesByUserId(user.getId());
  }

  @GetMapping("/total")
  public TransactionTotalDTO getTotalExpensesForMonth(
      @RequestParam int month, @RequestParam int year, @AuthenticationPrincipal User user) {
    return expenseService.getTotalExpensesForMonth(user.getId(), month, year);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Expense> updateExpense(
      HttpServletRequest request, @RequestBody ExpenseInputDTO expenseInput) {
    Expense expense = (Expense) request.getAttribute("expense");
    Expense savedExpense = expenseService.saveExpense(expense, expenseInput);

    return ResponseEntity.ok(savedExpense);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
    expenseService.deleteExpense(id);

    return ResponseEntity.ok().build();
  }
}

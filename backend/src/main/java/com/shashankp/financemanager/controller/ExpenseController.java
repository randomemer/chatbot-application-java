package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.dto.ExpenseInputDTO;
import com.shashankp.financemanager.dto.TransactionTotalDTO;
import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.model.ExpenseCategory;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.service.ExpenseCategoryService;
import com.shashankp.financemanager.service.ExpenseService;
import com.shashankp.financemanager.service.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
  @Autowired private ExpenseService expenseService;

  @Autowired private UserService userService;

  @Autowired private ExpenseCategoryService expenseCategoryService;

  @Autowired private ModelMapper modelMapper;

  @PostMapping
  public ResponseEntity<Expense> createExpense(
      @RequestBody ExpenseInputDTO expenseInputDTO, Principal principal) {
    // Check authenticated user exists
    Optional<User> userOptional = userService.findUserByUsername(principal.getName());
    if (userOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    System.out.println(expenseInputDTO.toString());

    Expense expense = modelMapper.map(expenseInputDTO, Expense.class);
    expense.setUser(userOptional.get());

    System.out.println(
        expense.getAmount() + " " + expense.getDescription() + " " + expense.getDate());

    // Check valid expense category
    Optional<ExpenseCategory> expenseCategoryOptional =
        expenseCategoryService.findExpenseCategoryById(expenseInputDTO.getCategory_id());
    if (expenseCategoryOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    expense.setCategory(expenseCategoryOptional.get());
    Expense savedExpense = expenseService.saveExpense(expense);

    return ResponseEntity.ok(savedExpense);
  }

  @GetMapping("/user/{userId}")
  public List<Expense> getExpensesByUserId(@PathVariable Long userId) {
    return expenseService.getExpensesByUserId(userId);
  }

  @GetMapping("/user/{userId}/total")
  public TransactionTotalDTO getTotalExpensesForMonth(
      @PathVariable Long userId, @RequestParam int month, @RequestParam int year) {
    return expenseService.getTotalExpensesForMonth(userId, month, year);
  }
}

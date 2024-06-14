package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.model.ExpenseCategory;
import com.shashankp.financemanager.service.ExpenseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense-categories")
public class ExpenseCategoryController {
  @Autowired private ExpenseCategoryService expenseCategoryService;

  @PostMapping
  @PreAuthorize(value = "hasAuthority('ADMIN')")
  public ResponseEntity<ExpenseCategory> createExpenseCategory(
      @RequestBody ExpenseCategory expenseCategory) {
    return ResponseEntity.ok(expenseCategoryService.saveExpenseCategory(expenseCategory));
  }

  @GetMapping
  public ResponseEntity<List<ExpenseCategory>> findAllCategories() {
    return ResponseEntity.ok(expenseCategoryService.findExpenseCategories());
  }
}

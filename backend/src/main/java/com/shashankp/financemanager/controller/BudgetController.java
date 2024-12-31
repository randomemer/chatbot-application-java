package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.dto.BudgetInputDTO;
import com.shashankp.financemanager.dto.BudgetSummaryDTO;
import com.shashankp.financemanager.model.Budget;
import com.shashankp.financemanager.security.CustomUserDetails;
import com.shashankp.financemanager.service.BudgetService;
import com.shashankp.financemanager.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
  @Autowired private UserService userService;

  @Autowired private BudgetService budgetService;

  @PostMapping
  public ResponseEntity<Budget> createBudget(
      @RequestBody BudgetInputDTO budgetInput,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    Budget createdBudget = budgetService.createBudget(budgetInput, userDetails.getUser());

    return ResponseEntity.ok(createdBudget);
  }

  @GetMapping
  public List<Budget> getBudgets(@AuthenticationPrincipal CustomUserDetails userDetails) {
    return budgetService.getBudgetsByUserId(userDetails.getId());
  }

  @GetMapping("/summary")
  public List<BudgetSummaryDTO> getBudgetSummary(
      @RequestParam int month,
      @RequestParam int year,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    return budgetService.getBudgetSummary(userDetails.getId(), month, year);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Budget> updateBudget(
      HttpServletRequest req, @RequestBody BudgetInputDTO budgetInput) {
    Budget budget = (Budget) req.getAttribute("budget");
    Budget savedBudget = budgetService.saveBudget(budget, budgetInput);

    return ResponseEntity.ok(savedBudget);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
    budgetService.deleteBudget(id);
    return ResponseEntity.ok().build();
  }
}

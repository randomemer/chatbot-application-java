package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.dto.BudgetSummaryDTO;
import com.shashankp.financemanager.model.Budget;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.service.BudgetService;
import com.shashankp.financemanager.service.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
  @Autowired private UserService userService;

  @Autowired private BudgetService budgetService;

  @PostMapping
  public ResponseEntity<Budget> createBudget(@RequestBody Budget budget, Principal principal) {
    Optional<User> userOptional = userService.findUserByUsername(principal.getName());
    if (userOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    budget.setUser(userOptional.get());
    Budget savedBudget = budgetService.saveBudget(budget);

    return ResponseEntity.ok(savedBudget);
  }

  @GetMapping("/user/{userId}")
  public List<Budget> getBudgetsByUserId(@PathVariable Long userId) {
    return budgetService.getBudgetsByUserId(userId);
  }

  @GetMapping("/user/{userId}/summary")
  public List<BudgetSummaryDTO> getBudgetSummary(
      @PathVariable Long userId, @RequestParam int month, @RequestParam int year) {
    return budgetService.getBudgetSummary(userId, month, year);
  }
}

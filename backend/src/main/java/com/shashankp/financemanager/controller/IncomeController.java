package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.dto.IncomeInputDTO;
import com.shashankp.financemanager.dto.TransactionTotalDTO;
import com.shashankp.financemanager.model.Income;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.security.CustomUserDetails;
import com.shashankp.financemanager.service.IncomeService;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {
  @Autowired private IncomeService incomeService;

  @PostMapping
  public ResponseEntity<Income> createIncome(
      @RequestBody Income income, @AuthenticationPrincipal User user) {
    income.setUser(user);
    Income savedIncome = incomeService.saveIncome(income);

    return ResponseEntity.ok(savedIncome);
  }

  @GetMapping
  public List<Income> getIncomesByUserId(@AuthenticationPrincipal CustomUserDetails userDetails) {
    return incomeService.findIncomesByUserId(userDetails.getId());
  }

  @GetMapping("/total")
  public TransactionTotalDTO getTotalForMonth(
      @RequestParam int month,
      @RequestParam int year,
      @AuthenticationPrincipal CustomUserDetails userDetails) {
    return incomeService.findTotalIncomesForMonth(userDetails.getId(), month, year);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Income> updateIncome(
      HttpServletRequest req, @RequestBody IncomeInputDTO incomeInput) {
    Income income = (Income) req.getAttribute("income");
    Income savedIncome = incomeService.updateIncome(income, incomeInput);

    return ResponseEntity.ok(savedIncome);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
    incomeService.deleteIncome(id);
    return ResponseEntity.ok().build();
  }
}

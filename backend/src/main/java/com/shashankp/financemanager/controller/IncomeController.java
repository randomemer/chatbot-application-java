package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.model.Income;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.model.dto.TransactionTotalDTO;
import com.shashankp.financemanager.service.IncomeService;
import com.shashankp.financemanager.service.UserService;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {
    @Autowired
    private UserService userService;

    @Autowired
    private IncomeService incomeService;

    @PostMapping
    public ResponseEntity<Income> createIncome(@RequestBody Income income, Principal principal) {
        Optional<User> userOptional = userService.findUserByUsername(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        income.setUser(userOptional.get());
        Income savedIncome = incomeService.saveIncome(income);
        
        return ResponseEntity.ok(savedIncome);
    }

    @GetMapping("/user/{userId}")
    public List<Income> getIncomesByUserId(@PathVariable Long userId) {
        return incomeService.findIncomesByUserId(userId);
    }

    @GetMapping("/total")
    public TransactionTotalDTO getTotalForMonth(@RequestParam int month, @RequestParam int year) {
        return incomeService.findTotalIncomesForMonth(month, year);
    }
}

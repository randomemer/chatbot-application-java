package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.service.ExpenseService;
import com.shashankp.financemanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense, Principal principal) {
        Optional<User> userOptional = userService.findUserByUsername(principal.getName());
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        expense.setUser(userOptional.get());
        Expense savedExpense = expenseService.saveExpense(expense);

        return ResponseEntity.ok(savedExpense);
    }

    @GetMapping("/user/{userId}")
    public List<Expense> getExpensesByUserId(@PathVariable Long userId) {
        return expenseService.getExpensesByUserId(userId);
    }
}

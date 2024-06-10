package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.model.Income;
import com.shashankp.financemanager.service.IncomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {
    @Autowired
    private IncomeService incomeService;

    @PostMapping
    public Income createIncome(@RequestBody Income income ) {
        return incomeService.saveIncome(income);
    }

    @GetMapping("/user/{userId}")
    public List<Income> getIncomesByUserId(@PathVariable Long id) {
        return incomeService.findIncomesByUserId(id);
    }
}

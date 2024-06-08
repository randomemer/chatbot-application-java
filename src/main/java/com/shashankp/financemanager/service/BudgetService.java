package com.shashankp.financemanager.service;

import com.shashankp.financemanager.model.Budget;
import com.shashankp.financemanager.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;

    public Budget saveBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public List<Budget> getBudgetsByUserId(Long id) {
        return budgetRepository.findByUserId(id);
    }
}

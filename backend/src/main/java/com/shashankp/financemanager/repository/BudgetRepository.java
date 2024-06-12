package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserId(Long userId);
}

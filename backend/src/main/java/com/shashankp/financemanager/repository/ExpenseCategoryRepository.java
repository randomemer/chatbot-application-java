package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.model.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {}

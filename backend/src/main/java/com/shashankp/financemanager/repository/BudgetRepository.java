package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.dto.BudgetSummaryDTO;
import com.shashankp.financemanager.model.Budget;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
  List<Budget> findByUserId(Long userId);

  @Query(
      """
    SELECT new com.shashankp.financemanager.dto.BudgetSummaryDTO(
        b.id, b.user.id, b.amount, b.category.id, ec.name, COALESCE(SUM(e.amount), 0)
    )
    FROM Budget b
        LEFT JOIN ExpenseCategory ec ON ec.id = b.category.id
        LEFT JOIN Expense e ON e.category.id = b.category.id
    WHERE
      b.user.id = :userId
      AND MONTH(e.date) = :month
      AND YEAR(e.date) = :year
    GROUP BY
        b.id, ec.name
  """)
  List<BudgetSummaryDTO> getBudgetSummary(
      @Param("userId") Long userId, @Param("month") int month, @Param("year") int year);
}

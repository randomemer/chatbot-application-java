package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.dto.BudgetSummaryDTO;
import com.shashankp.financemanager.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUserId(Long userId);

    @Query(
            """
                    SELECT new com.shashankp.financemanager.dto.BudgetSummaryDTO(
                        b.id AS budget_id,
                        b.user.id AS user_id,
                        b.amount AS budget_limit,
                        b.category.id AS category_id,
                        ec.name AS category_name,
                        IFNULL(SUM(e.amount), 0) AS total_expenses
                    )
                    FROM
                      Budget b
                    LEFT JOIN
                      ExpenseCategory ec ON ec.id = b.category.id
                    LEFT JOIN
                      Expense e ON e.category.id = b.category.id
                      AND b.user.id = e.user.id
                      AND MONTH(e.date) = :month
                      AND YEAR(e.date) = :year
                    WHERE
                      b.user.id = :userId
                    GROUP BY
                        b.id, b.user.id, b.amount, b.category.id, ec.id, ec.name, b.amount
                    """)
    List<BudgetSummaryDTO> getBudgetSummary(
            @Param("userId") Long userId, @Param("month") int month, @Param("year") int year);
}

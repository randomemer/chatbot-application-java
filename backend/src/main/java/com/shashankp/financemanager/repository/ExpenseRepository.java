package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.dto.TransactionTotalDTO;
import com.shashankp.financemanager.model.Expense;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  @Query("SELECT e FROM Expense e WHERE e.user.id = :userId ORDER BY e.date DESC")
  List<Expense> findByUserId(Long userId);

  @Query(
      """
    SELECT new com.shashankp.financemanager.dto.TransactionTotalDTO(
      SUM(e.amount) AS amount,
      MONTH(e.date) AS month,
      YEAR(e.date) AS year
    ) FROM Expense e
    WHERE
      e.user.id = :userId
      AND YEAR(e.date) = :year
      AND MONTH(e.date) = :month
    GROUP BY MONTH(e.date), YEAR(e.date)
    """)
  Optional<TransactionTotalDTO> findTotalForMonth(
      @Param("userId") Long userId, @Param("month") int month, @Param("year") int year);
}

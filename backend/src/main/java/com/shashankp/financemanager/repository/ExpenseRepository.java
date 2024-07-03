package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.model.dto.TransactionTotalDTO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  List<Expense> findByUserId(Long userId);

  @Query(
      """
    SELECT new com.shashankp.financemanager.model.dto.TransactionTotalDTO(
      SUM(e.amount), MONTH(e.date), YEAR(e.date)
    ) FROM Expense e
    WHERE
      e.user.id = :userId
      AND YEAR(e.date) = :year
      AND MONTH(e.date) = :month
    GROUP BY MONTH(e.date), YEAR(e.date)
    """)
  TransactionTotalDTO findTotalForMonth(
      @Param("userId") Long userId, @Param("month") int month, @Param("year") int year);
}

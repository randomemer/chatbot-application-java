package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.dto.TransactionTotalDTO;
import com.shashankp.financemanager.model.Income;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IncomeRepository extends JpaRepository<Income, Long> {
  List<Income> findByUserId(Long userId);

  @Query(
      """
    SELECT new com.shashankp.financemanager.dto.TransactionTotalDTO(
      SUM(i.amount), MONTH(i.date), YEAR(i.date)
    ) FROM Income i
    WHERE
      i.user.id = :userId
      AND YEAR(i.date) = :year
      AND MONTH(i.date) = :month
    GROUP BY MONTH(i.date), YEAR(i.date)
    """)
  Optional<TransactionTotalDTO> findTotalForMonth(
      @Param("userId") Long userId, @Param("month") int month, @Param("year") int year);
}

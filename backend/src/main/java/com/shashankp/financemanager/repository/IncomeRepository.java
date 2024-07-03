package com.shashankp.financemanager.repository;

import com.shashankp.financemanager.model.Income;
import com.shashankp.financemanager.model.dto.TransactionTotalDTO;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IncomeRepository extends JpaRepository<Income, Long> {
  List<Income> findByUserId(Long userId);

  @Query(
      """
    SELECT new com.shashankp.financemanager.model.dto.TransactionTotalDTO(
      SUM(i.amount), MONTH(i.date), YEAR(i.date)
    ) FROM Income i
    WHERE YEAR(i.date) = :year AND MONTH(i.date) = :month
    """)
  TransactionTotalDTO findTotalForMonth(@Param("month") int month, @Param("year") int year);
}

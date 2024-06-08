package com.shashankp.financemanager.service;

import com.shashankp.financemanager.model.Income;
import com.shashankp.financemanager.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService {
    @Autowired
    private IncomeRepository incomeRepository;

    public Income saveIncome(Income income) {
        return incomeRepository.save(income);
    }

    public List<Income> findIncomesByUserId(Long id) {
        return incomeRepository.findByUserId(id);
    }
}

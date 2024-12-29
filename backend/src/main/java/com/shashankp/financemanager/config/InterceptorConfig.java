package com.shashankp.financemanager.config;

import com.shashankp.financemanager.interceptors.ExpenseInterceptor;
import com.shashankp.financemanager.interceptors.IncomeInterceptor;
import com.shashankp.financemanager.repository.ExpenseRepository;
import com.shashankp.financemanager.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
  @Autowired ExpenseRepository expenseRepository;
  @Autowired IncomeRepository incomeRepository;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry
        .addInterceptor(new ExpenseInterceptor(expenseRepository))
        .addPathPatterns("/api/expenses/*");

    registry
        .addInterceptor(new IncomeInterceptor(incomeRepository))
        .addPathPatterns("/api/incomes/*");
  }
}

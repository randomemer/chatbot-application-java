package com.shashankp.financemanager.config;

import com.shashankp.financemanager.interceptors.ExpenseInterceptor;
import com.shashankp.financemanager.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
  @Autowired ExpenseRepository expenseRepository;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry
        .addInterceptor(new ExpenseInterceptor(expenseRepository))
        .addPathPatterns("/api/expenses/*");
  }
}

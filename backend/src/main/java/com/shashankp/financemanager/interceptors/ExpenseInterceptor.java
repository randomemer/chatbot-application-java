package com.shashankp.financemanager.interceptors;

import com.shashankp.financemanager.model.Expense;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.repository.ExpenseRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Objects;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;

public class ExpenseInterceptor implements HandlerInterceptor {
  private final ExpenseRepository expenseRepository;

  // Constructor-based Dependency Injection
  public ExpenseInterceptor(ExpenseRepository expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  @Override
  public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) {
    String uri = req.getRequestURI();

    if (uri.matches("/api/expenses/\\d+")) {
      String id = uri.substring(uri.lastIndexOf("/") + 1);
      System.out.println("Expense id from interceptor : " + id);

      // 1. Check if the expense exists
      Optional<Expense> expenseOptional = expenseRepository.findById(Long.parseLong(id));
      if (expenseOptional.isEmpty()) {
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return false;
      }

      // 2. Check if the expense belongs to this user
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      Object principal = auth.getPrincipal();

      if (principal instanceof User user) {
        if (!Objects.equals(expenseOptional.get().getUser().getId(), user.getId())) {
          resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
          return false;
        }
      }

      // 3. Store the expense object in the request
      req.setAttribute("expense", expenseOptional.get());
    }

    return true;
  }
}

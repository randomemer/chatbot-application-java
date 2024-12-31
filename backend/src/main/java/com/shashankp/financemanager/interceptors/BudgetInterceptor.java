package com.shashankp.financemanager.interceptors;

import com.shashankp.financemanager.model.Budget;
import com.shashankp.financemanager.repository.BudgetRepository;
import com.shashankp.financemanager.security.CustomUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Objects;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;

public class BudgetInterceptor implements HandlerInterceptor {
  private final BudgetRepository budgetRepo;

  public BudgetInterceptor(BudgetRepository budgetRepository) {
    this.budgetRepo = budgetRepository;
  }

  @Override
  public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler)
      throws Exception {
    String uri = req.getRequestURI();

    if (uri.matches("/api/budgets/\\d+")) {
      String id = uri.substring(uri.lastIndexOf("/") + 1);

      // 1. Check if the budget exists
      Optional<Budget> budgetOptional = budgetRepo.findById(Long.parseLong(id));
      if (budgetOptional.isEmpty()) {
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return false;
      }

      // 2. Check if the budget belongs to this user
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      Object principal = auth.getPrincipal();

      if (principal instanceof CustomUserDetails user) {
        if (!Objects.equals(budgetOptional.get().getUser().getId(), user.getId())) {
          resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
          return false;
        }
      }

      // 3. Store the budget object in request
      req.setAttribute("budget", budgetOptional.get());
    }

    return true;
  }
}

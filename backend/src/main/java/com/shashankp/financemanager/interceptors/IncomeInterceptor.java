package com.shashankp.financemanager.interceptors;

import com.shashankp.financemanager.model.Income;
import com.shashankp.financemanager.repository.IncomeRepository;
import com.shashankp.financemanager.security.CustomUserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Objects;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;

public class IncomeInterceptor implements HandlerInterceptor {
  private final IncomeRepository incomeRepository;

  public IncomeInterceptor(IncomeRepository incomeRepository) {
    this.incomeRepository = incomeRepository;
  }

  @Override
  public boolean preHandle(HttpServletRequest req, HttpServletResponse resp, Object handler) {
    String uri = req.getRequestURI();

    if (uri.matches("/api/incomes/\\d+")) {
      String id = uri.substring(uri.lastIndexOf("/") + 1);

      // 1. Check if the income exists
      Optional<Income> incomeOptional = incomeRepository.findById(Long.parseLong(id));
      if (incomeOptional.isEmpty()) {
        resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return false;
      }

      // 2. Check if the expense belongs to this user
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      Object principal = auth.getPrincipal();

      if (principal instanceof CustomUserDetails user) {
        if (!Objects.equals(incomeOptional.get().getUser().getId(), user.getId())) {
          resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
          return false;
        }
      }

      // 3. Store the expense object in the request
      req.setAttribute("income", incomeOptional.get());
    }

    return true;
  }
}

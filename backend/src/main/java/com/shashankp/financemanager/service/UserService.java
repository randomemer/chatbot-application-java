package com.shashankp.financemanager.service;

import com.shashankp.financemanager.enumeration.RoleEnum;
import com.shashankp.financemanager.model.Role;
import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  @Value(value = "${admin.username}")
  private String adminUsername;

  @Autowired private UserRepository userRepository;

  @Autowired private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired private AuthenticationManager authenticationManager;

  private final SecurityContextRepository securityContextRepository;

  private final SecurityContextHolderStrategy securityContextHolderStrategy;

  public UserService(SecurityContextRepository securityContextRepository) {
    this.securityContextRepository = securityContextRepository;
    this.securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
  }

  public Optional<User> findUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }

  public User registerUser(User user) {
    Optional<User> exists = userRepository.findByUsername(user.getUsername());

    if (exists.isPresent()) {
      throw new IllegalStateException(user.getUsername() + " already exists");
    }

    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

    // Add default user role
    user.addRole(new Role(RoleEnum.USER));

    if (adminUsername.equals(user.getUsername())) {
      user.addRole(new Role(RoleEnum.ADMIN));
    }

    userRepository.save(user);
    return user;
  }

  public User loginUser(User user, HttpServletRequest request, HttpServletResponse response) {
    // Validate User credentials
    Authentication authentication =
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken.unauthenticated(
                user.getUsername(), user.getPassword()));

    // Create a new context
    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
    securityContext.setAuthentication(authentication);

    // Update SecurityContextHolder and Strategy
    securityContextHolderStrategy.setContext(securityContext);
    securityContextRepository.saveContext(securityContext, request, response);

    return user;
  }
}

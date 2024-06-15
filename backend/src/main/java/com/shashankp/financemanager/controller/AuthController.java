package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired private UserService userService;

  @PostMapping("/login")
  public ResponseEntity<User> login(
      @RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
    User body = userService.loginUser(user, request, response);
    return ResponseEntity.ok(body);
  }

  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody User user) {
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
  }

  @GetMapping("/me")
  public ResponseEntity<User> me(Authentication authentication) {
    if (authentication == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    String username = authentication.getName();
    Optional<User> userOptional = userService.findUserByUsername(username);
    return userOptional
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  }
}

package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired private UserService userService;

  @PostMapping("/register")
  public ResponseEntity<User> register(@RequestBody User user) {
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
  }

  @PostMapping("/login")
  public ResponseEntity<User> login(
      @RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
    User body = userService.loginUser(user, request, response);
    System.out.println(body.getRoles().size());
    return ResponseEntity.ok(body);
  }

  @GetMapping("/{username}")
  public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    Optional<User> userOptional = userService.findUserByUsername(username);
    if (userOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(userOptional.get());
  }
}

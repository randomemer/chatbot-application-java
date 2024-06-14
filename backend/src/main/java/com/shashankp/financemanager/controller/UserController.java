package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.service.UserService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired private UserService userService;

  @GetMapping("/{username}")
  @PreAuthorize(value = "hasAuthority('ADMIN')")
  public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    Optional<User> userOptional = userService.findUserByUsername(username);
    return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping
  @PreAuthorize(value = "hasAuthority('ADMIN')")
  public ResponseEntity<List<User>> findAllUsers() {
    return ResponseEntity.ok(userService.findAllUsers());
  }
}

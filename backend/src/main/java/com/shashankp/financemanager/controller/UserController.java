package com.shashankp.financemanager.controller;

import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.service.UserService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired private UserService userService;

  @GetMapping("/{username}")
  public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
    Optional<User> userOptional = userService.findUserByUsername(username);
    if (userOptional.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(userOptional.get());
  }
}

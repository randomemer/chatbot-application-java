package com.shashankp.financemanager.service;

import com.shashankp.financemanager.model.User;
import com.shashankp.financemanager.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired private UserRepository userRepository;

  public UserDetails loadUserByUsername(String username) {
    Optional<User> userOptional = userRepository.findByUsername(username);
    if (userOptional.isEmpty()) {
      throw new UsernameNotFoundException(username);
    }

    User user = userOptional.get();

    return new org.springframework.security.core.userdetails.User(
        user.getUsername(), user.getPassword(), user.getAuthorities());
  }
}

package com.shashankp.financemanager.config;

import java.nio.file.AccessDeniedException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ControllerAdvices extends ResponseEntityExceptionHandler {
  private record ExceptionDetails(String message, HttpStatus httpStatus, ZonedDateTime timestamp) {}

  @ExceptionHandler(
      value = {
        RuntimeException.class,
        UnsupportedOperationException.class,
        IllegalStateException.class
      })
  public ResponseEntity<?> runTimeException(Exception ex) {
    ex.printStackTrace();
    var exceptionDetails =
        new ExceptionDetails(
            ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, ZonedDateTime.now(ZoneId.of("UTC")));
    return new ResponseEntity<>(exceptionDetails, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(value = {AccessDeniedException.class})
  public ResponseEntity<?> accessDenied(Exception e) {
    var exceptionDetails =
        new ExceptionDetails(
            e.getMessage(), HttpStatus.FORBIDDEN, ZonedDateTime.now(ZoneId.of("UTC")));
    return new ResponseEntity<>(exceptionDetails, HttpStatus.FORBIDDEN);
  }
}

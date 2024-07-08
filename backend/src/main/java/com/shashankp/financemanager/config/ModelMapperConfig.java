package com.shashankp.financemanager.config;

import java.time.LocalDate;
import org.modelmapper.AbstractConverter;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
  static class LocalDateToString extends AbstractConverter<LocalDate, String> {
    @Override
    protected String convert(LocalDate localDate) {
      return localDate.toString();
    }
  }

  static class StringToLocalDate extends AbstractConverter<String, LocalDate> {
    @Override
    protected LocalDate convert(String date) {
      return LocalDate.parse(date);
    }
  }

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mapper = new ModelMapper();

    mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
    mapper.addConverter(new LocalDateToString());
    mapper.addConverter(new StringToLocalDate());

    return mapper;
  }
}

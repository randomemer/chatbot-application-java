package com.shashankp.financemanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @JsonBackReference(value = "user-expenses")
    @OneToMany(mappedBy = "user")
    private List<Expense> expenses;

    @JsonBackReference(value = "user-incomes")
    @OneToMany(mappedBy = "user")
    private List<Income> incomes;

    @JsonBackReference(value = "user-budgets")
    @OneToMany(mappedBy = "user")
    private List<Budget> budgets;
}

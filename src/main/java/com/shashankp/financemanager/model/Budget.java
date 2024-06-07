package com.shashankp.financemanager.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private double amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

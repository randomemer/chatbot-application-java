package com.shashankp.financemanager.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;

    @Column(nullable = false)
    private String category;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

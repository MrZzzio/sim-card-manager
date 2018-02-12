package com.artezio.simcardmanager.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Random;

@Entity
public class Card {

  @Id
  @GeneratedValue
  private Long id;

  @Column(nullable = false)
  private String phoneNumber;

  @Enumerated(value = EnumType.STRING)
  private Operator operator;

  @Column(nullable = false)
  private int balance;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public Operator getOperator() {
    return operator;
  }

  public void setOperator(Operator operator) {
    this.operator = operator;
  }

  public int getBalance() {
    return balance;
  }

  public void setBalance(int balance) {
    this.balance = balance;
  }

  public enum Operator {
    MTS,
    BEELINE,
    MEGAFON,
    TELE2
  }

  public static String randomPhoneNumber() {
    Random random = new Random();
    StringBuilder randomNumber = new StringBuilder("+7");
    for (int i = 0; i < 9; i++) {
      randomNumber.append(random.nextInt(9));
    }
    return randomNumber.toString();
  }

  public static Operator randomOperator() {
    Random random = new Random();
    int i = random.nextInt(Operator.values().length);
    return Operator.values()[i];
  }

  public static int randomBalance() {
    Random random = new Random();
    return random.nextInt(300);
  }

}

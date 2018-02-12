package com.artezio.simcardmanager.repository;

import com.artezio.simcardmanager.model.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Long> {
  Iterable<Card> findByNumberContaining(String number);
}

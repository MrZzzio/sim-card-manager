package com.artezio.simcardmanager.repository;

import com.artezio.simcardmanager.model.Card;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CardRepository extends PagingAndSortingRepository<Card, Long>{
}

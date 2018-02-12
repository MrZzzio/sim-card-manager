package com.artezio.simcardmanager;

import com.artezio.simcardmanager.model.Card;
import com.artezio.simcardmanager.repository.CardRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.IntStream;

@SpringBootApplication
public class SimCardManagerApplication {

    private final CardRepository cardRepository;

    public SimCardManagerApplication(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

	public static void main(String[] args) {
		SpringApplication.run(SimCardManagerApplication.class, args);
	}

	@Bean
	public CommandLineRunner init() {
		return (i) -> generateCards();
	}

	private void generateCards() {
		int count = 10;
        IntStream.range(0, count)
                .forEach(i -> {
                    Card card = this.createCard();
                    this.cardRepository.save(card);
                });
	}

	private Card createCard() {
        Card card = new Card();
        card.setNumber(Card.randomPhoneNumber());
        card.setOperator(Card.randomOperator());
        card.setBalance(Card.randomBalance());
        return card;
    }
}

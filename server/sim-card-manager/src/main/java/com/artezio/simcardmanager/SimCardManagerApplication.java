package com.artezio.simcardmanager;

import com.artezio.simcardmanager.model.Card;
import com.artezio.simcardmanager.model.User;
import com.artezio.simcardmanager.repository.CardRepository;
import com.artezio.simcardmanager.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.IntStream;

@SpringBootApplication
public class SimCardManagerApplication {

    private final CardRepository cardRepository;

    private final UserRepository userRepository;

    public SimCardManagerApplication(CardRepository cardRepository, UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

	public static void main(String[] args) {
		SpringApplication.run(SimCardManagerApplication.class, args);
	}

	@Bean
	public CommandLineRunner init() {
		return (i) -> generateCards();
	}

	private void generateCards() {
		int count = 124;
        IntStream.range(0, count)
                .forEach(i -> {
                    Card card = this.createCard();
                    this.cardRepository.save(card);
                });
        this.createUser("login", "123");
	}

	private Card createCard() {
        Card card = new Card();
        card.setNumber(Card.randomPhoneNumber());
        card.setOperator(Card.randomOperator());
        card.setBalance(Card.randomBalance());
        return card;
    }

    private void createUser(String login, String password) {
        User user = new User();
        user.setLogin(login);
        user.setPassword(password);
        this.userRepository.save(user);
    }
}

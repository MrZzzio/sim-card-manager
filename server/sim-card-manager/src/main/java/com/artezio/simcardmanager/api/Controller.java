package com.artezio.simcardmanager.api;

import com.artezio.simcardmanager.common.NotAuthorizedException;
import com.artezio.simcardmanager.model.Card;
import com.artezio.simcardmanager.model.User;
import com.artezio.simcardmanager.repository.CardRepository;
import com.artezio.simcardmanager.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
@RequestMapping("/api")
public class Controller {

    private final CardRepository cardRepository;

    private final UserRepository userRepository;

    public Controller(CardRepository cardRepository, UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/cards")
    public Iterable<Card> getAll() {
        Iterable<Card> all = this.cardRepository.findAll();
        return all;
    }

    @GetMapping("/cards/{id}")
    public Card getOne(@PathVariable(value = "id") Long id) {
        Card one = this.cardRepository.findOne(id);
        return one;
    }

    @DeleteMapping("/cards/{id}")
    public void deleteOne(@PathVariable(value = "id") Long id) {
        this.cardRepository.delete(id);
    }

    @PostMapping("/cards")
    @ResponseStatus(HttpStatus.CREATED)
    public Card createOne(@RequestBody Card card) {
        return this.cardRepository.save(card);
    }

    @PutMapping("/cards")
    public Card updateOne(@RequestBody Card card) {
        return this.cardRepository.save(card);
    }

    @GetMapping("/cards/search")
    public Iterable<Card> search(@RequestParam(value = "number") String number) {
        Iterable<Card> byNumberLike = this.cardRepository.findByNumberContaining(number);
        return byNumberLike;
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User byLogin = this.userRepository.findByLogin(user.getLogin());
        if (byLogin != null && user.getPassword().equals(byLogin.getPassword())) {
            return byLogin;
        } else {
            throw new NotAuthorizedException();
        }
    }

}

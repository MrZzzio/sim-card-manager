package com.artezio.simcardmanager.api;

import com.artezio.simcardmanager.common.NotAuthorizedException;
import com.artezio.simcardmanager.model.Card;
import com.artezio.simcardmanager.model.User;
import com.artezio.simcardmanager.repository.CardRepository;
import com.artezio.simcardmanager.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT},
        exposedHeaders = "x-auth-token")
@RequestMapping("/api")
public class Controller {

    private final CardRepository cardRepository;

    private final UserRepository userRepository;

    public Controller(CardRepository cardRepository, UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/cards")
    public Page<Card> getAll(HttpServletRequest request,
                             @PageableDefault(size = 10) Pageable pageable) {
        if (this.checkRequestToken(request)){
            Page<Card> all = this.cardRepository.findAll(pageable);
            return all;
        } else {
            throw new NotAuthorizedException();
        }
    }

    @GetMapping("/cards/max")
    public Iterable<Card> getMax(HttpServletRequest request,
                                 @PageableDefault(direction = Sort.Direction.DESC)  Sort sort) {
        if (this.checkRequestToken(request)) {
            Iterable<Card> all = this.cardRepository.findAll(sort);
            return all;
        } else {
            throw new NotAuthorizedException();
        }
    }

    @GetMapping("/cards/{id}")
    public Card getOne(@PathVariable(value = "id") Long id,
                       HttpServletRequest request) {
        if (this.checkRequestToken(request)){
            Card one = this.cardRepository.findOne(id);
            return one;
        } else {
            throw new NotAuthorizedException();
        }
    }

    @DeleteMapping("/cards/{id}")
    public void deleteOne(@PathVariable(value = "id") Long id,
                          HttpServletRequest request) {
        if (this.checkRequestToken(request)){
            this.cardRepository.delete(id);
        } else {
            throw new NotAuthorizedException();
        }
    }

    @PostMapping("/cards")
    @ResponseStatus(HttpStatus.CREATED)
    public Card createOne(@RequestBody Card card,
                          HttpServletRequest request) {
        if (this.checkRequestToken(request)) {
            return this.cardRepository.save(card);
        } else {
            throw new NotAuthorizedException();
        }
    }

    @PutMapping("/cards")
    public Card updateOne(@RequestBody Card card,
                          HttpServletRequest request) {
        if (this.checkRequestToken(request)){
            return this.cardRepository.save(card);
        } else {
            throw new NotAuthorizedException();
        }
    }

    @GetMapping("/cards/search")
    public Iterable<Card> search(@RequestParam(value = "number") String number,
                                 HttpServletRequest request) {
        if (this.checkRequestToken(request)) {
            Iterable<Card> byNumberLike = this.cardRepository.findByNumberContaining(number);
            return byNumberLike;
        } else {
            throw new NotAuthorizedException();
        }
    }

    @PostMapping("/login")
    public User login(@RequestBody User user,
                      HttpServletResponse response) {
        User byLogin = this.userRepository.findByLogin(user.getLogin());
        if (byLogin != null && user.getPassword().equals(byLogin.getPassword())) {
            response.setHeader("x-auth-token", this.generateSecureJwt());
            return byLogin;
        } else {
            throw new NotAuthorizedException();
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody User user) {
        this.userRepository.save(user);
    }

    @GetMapping("/register")
    public Boolean checkRegister(@RequestParam (value = "login") String login) {
        return this.userRepository.findByLogin(login) == null;
    }

    //this is secure service for generate and check JWT
    private boolean checkRequestToken(HttpServletRequest request) {
        boolean result = false;
        if (request.getHeader("x-auth-token") != null) {
            result = request.getHeader("x-auth-token").equals(this.generateSecureJwt());
        }
        return result;
    }

    private String generateSecureJwt() {
        return "jwt-token";
    }

}

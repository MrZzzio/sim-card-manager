package com.artezio.simcardmanager.repository;

import com.artezio.simcardmanager.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByLogin(String login);
}

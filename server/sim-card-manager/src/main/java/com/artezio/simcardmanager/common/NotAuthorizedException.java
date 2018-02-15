package com.artezio.simcardmanager.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Bad login or password")
public class NotAuthorizedException extends RuntimeException {

    public NotAuthorizedException() {
        super();
    }
}

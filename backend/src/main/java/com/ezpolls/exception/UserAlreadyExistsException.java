package com.ezpolls.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String username) {
        super("A user with username '" + username + "' already exists.");
    }
}
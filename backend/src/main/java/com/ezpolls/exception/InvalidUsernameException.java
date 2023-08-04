package com.ezpolls.exception;

public class InvalidUsernameException extends RuntimeException {
    public InvalidUsernameException() {
        super("Username must be at least 4 characters long and contain only alphanumeric characters.");
    }
}
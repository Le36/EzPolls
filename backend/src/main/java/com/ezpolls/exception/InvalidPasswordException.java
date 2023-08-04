package com.ezpolls.exception;

public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
        super("Password must contain at least one digit, one lower case, one upper case and should be at least 8 characters long.");
    }
}
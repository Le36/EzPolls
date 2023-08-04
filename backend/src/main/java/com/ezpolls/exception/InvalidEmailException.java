package com.ezpolls.exception;

public class InvalidEmailException extends RuntimeException {
    public InvalidEmailException() {
        super("Invalid email format.");
    }
}
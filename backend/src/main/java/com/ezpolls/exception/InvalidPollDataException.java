package com.ezpolls.exception;

public class InvalidPollDataException extends RuntimeException {
    public InvalidPollDataException(String message) {
        super(message);
    }
}
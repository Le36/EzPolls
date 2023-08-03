package com.ezpolls.exception;

public class RateLimitException extends RuntimeException {
    public RateLimitException() {
        super("Too many requests. Please try to slow down.");
    }
}
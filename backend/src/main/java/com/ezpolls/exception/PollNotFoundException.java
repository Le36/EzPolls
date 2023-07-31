package com.ezpolls.exception;

public class PollNotFoundException extends RuntimeException {
    public PollNotFoundException() {
        super("Poll not found");
    }
}
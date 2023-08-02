package com.ezpolls.exception;

public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException() {
        super("User is not authorized to perform this action.");
    }
}
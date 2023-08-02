package com.ezpolls.exception;

public class UserNotLoggedInException extends RuntimeException {
    public UserNotLoggedInException() {
        super("User must be logged in to vote on this poll.");
    }
}
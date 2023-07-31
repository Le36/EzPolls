package com.ezpolls.exception;

public class VoteNotPermittedException extends RuntimeException {
    public VoteNotPermittedException() {
        super("You have already voted, revoting is not allowed in this poll");
    }
}
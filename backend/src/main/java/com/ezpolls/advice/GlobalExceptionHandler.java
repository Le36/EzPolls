package com.ezpolls.advice;

import com.ezpolls.exception.PollNotFoundException;
import com.ezpolls.exception.VoteNotPermittedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {VoteNotPermittedException.class})
    public ResponseEntity<Object> handleVoteNotPermittedException(VoteNotPermittedException ex) {
        ApiError apiError = new ApiError(HttpStatus.FORBIDDEN, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(value = {PollNotFoundException.class})
    public ResponseEntity<Object> handlePollNotFoundException(PollNotFoundException ex) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
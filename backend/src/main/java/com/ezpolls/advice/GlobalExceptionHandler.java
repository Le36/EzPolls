package com.ezpolls.advice;

import com.ezpolls.exception.*;
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

    @ExceptionHandler(value = {RateLimitException.class})
    public ResponseEntity<Object> handleRateLimitException(RateLimitException ex) {
        ApiError apiError = new ApiError(HttpStatus.TOO_MANY_REQUESTS, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(value = {UserAlreadyExistsException.class})
    public ResponseEntity<Object> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        ApiError apiError = new ApiError(HttpStatus.CONFLICT, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(value = {InvalidCredentialsException.class})
    public ResponseEntity<Object> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(value = {UserNotLoggedInException.class})
    public ResponseEntity<Object> handleUserNotLoggedInException(UserNotLoggedInException ex) {
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(value = {UnauthorizedAccessException.class})
    public ResponseEntity<Object> handleUnauthorizedAccessException(UnauthorizedAccessException ex) {
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(value = {InvalidUsernameException.class})
    public ResponseEntity<Object> handleInvalidUsernameException(InvalidUsernameException ex) {
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(value = {InvalidPasswordException.class})
    public ResponseEntity<Object> handleInvalidPasswordException(InvalidPasswordException ex) {
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(value = {InvalidEmailException.class})
    public ResponseEntity<Object> handleInvalidEmailException(InvalidEmailException ex) {
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
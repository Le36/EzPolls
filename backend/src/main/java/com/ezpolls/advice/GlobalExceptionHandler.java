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
        return buildErrorResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    @ExceptionHandler(value = {PollNotFoundException.class})
    public ResponseEntity<Object> handlePollNotFoundException(PollNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(value = {RateLimitException.class})
    public ResponseEntity<Object> handleRateLimitException(RateLimitException ex) {
        return buildErrorResponse(HttpStatus.TOO_MANY_REQUESTS, ex.getMessage());
    }

    @ExceptionHandler(value = {UserAlreadyExistsException.class})
    public ResponseEntity<Object> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return buildErrorResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(value = {InvalidCredentialsException.class})
    public ResponseEntity<Object> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(value = {UserNotLoggedInException.class})
    public ResponseEntity<Object> handleUserNotLoggedInException(UserNotLoggedInException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(value = {UnauthorizedAccessException.class})
    public ResponseEntity<Object> handleUnauthorizedAccessException(UnauthorizedAccessException ex) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(value = {InvalidUsernameException.class})
    public ResponseEntity<Object> handleInvalidUsernameException(InvalidUsernameException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(value = {InvalidPasswordException.class})
    public ResponseEntity<Object> handleInvalidPasswordException(InvalidPasswordException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(value = {InvalidEmailException.class})
    public ResponseEntity<Object> handleInvalidEmailException(InvalidEmailException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(value = {InvalidPollDataException.class})
    public ResponseEntity<Object> handleInvalidPollData(InvalidPollDataException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(value = {InvalidCaptchaException.class})
    public ResponseEntity<Object> handleInvalidCaptchaException(InvalidCaptchaException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    private ResponseEntity<Object> buildErrorResponse(HttpStatus status, String errorMessage) {
        ApiError apiError = new ApiError(status, errorMessage);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
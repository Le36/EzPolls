package com.ezpolls.exception;

public class InvalidCaptchaException extends RuntimeException {
    public InvalidCaptchaException() {
        super("Captcha verification failed.");
    }
}

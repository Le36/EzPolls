package com.ezpolls.security;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class CaptchaService {

    private final RestTemplate restTemplate;
    @Value("${recaptcha.secret}")
    private String recaptchaSecret;

    @Autowired
    public CaptchaService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public boolean isResponseValid(String response) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("secret", recaptchaSecret);
        form.add("response", response);

        ReCaptchaResponse reCaptchaResponse = restTemplate.postForObject("https://www.google.com/recaptcha/api/siteverify", form, ReCaptchaResponse.class);

        if (reCaptchaResponse == null) {
            return false;
        }

        return reCaptchaResponse.isSuccess();
    }

    @Data
    static class ReCaptchaResponse {
        private boolean success;
    }
}
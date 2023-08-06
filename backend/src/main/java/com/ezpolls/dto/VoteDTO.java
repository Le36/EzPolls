package com.ezpolls.dto;

import lombok.Data;

import java.util.List;

@Data
public class VoteDTO {
    private List<String> optionTexts;
    private String recaptchaToken;
}
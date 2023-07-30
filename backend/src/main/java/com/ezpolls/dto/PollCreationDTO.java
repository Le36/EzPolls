package com.ezpolls.dto;

import com.ezpolls.model.Poll;
import lombok.Data;

import java.util.List;

@Data
public class PollCreationDTO {
    private String question;
    private List<String> options;
    private Poll.VotingRestriction votingRestriction;
    private boolean multipleChoicesAllowed;
}
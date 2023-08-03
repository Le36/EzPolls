package com.ezpolls.dto;

import com.ezpolls.model.Poll;
import lombok.Data;

import java.util.List;

@Data
public class PollResponseDTO {
    private Poll poll;
    private List<String> userVotes;
}
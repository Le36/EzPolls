package com.ezpolls.dto;

import com.ezpolls.model.Poll;
import com.ezpolls.model.User;
import lombok.Data;

import java.util.List;

@Data
public class UserPollsDTO {
    private User user;
    private List<Poll> polls;
}
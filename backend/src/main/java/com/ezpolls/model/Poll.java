package com.ezpolls.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "polls")
public class Poll {

    @Id
    private String id;
    private String question;
    private List<Option> options;
    private VotingRestriction votingRestriction;
    private boolean multipleChoicesAllowed;
    private boolean revotingAllowed;

    @Getter
    @Setter
    public static class Option {
        private String optionText;
        private int voteCount;
    }

    public enum VotingRestriction {
        ONE_VOTE_PER_IP,
        ONE_VOTE_PER_USER,
        NO_RESTRICTION
    }

}
package com.ezpolls.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class VoteCastEvent extends ApplicationEvent {

    private final String pollId;

    public VoteCastEvent(Object source, String pollId) {
        super(source);
        this.pollId = pollId;
    }
}
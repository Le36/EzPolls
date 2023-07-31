package com.ezpolls.controller;

import com.ezpolls.dto.PollCreationDTO;
import com.ezpolls.dto.VoteDTO;
import com.ezpolls.model.Poll;
import com.ezpolls.service.PollService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    private final PollService pollService;

    @Autowired
    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping
    public Poll createPoll(@RequestBody PollCreationDTO pollCreationDTO) {
        return pollService.createPoll(pollCreationDTO);
    }

    @GetMapping("/{id}")
    public Poll getPoll(@PathVariable String id) {
        return pollService.getPoll(id);
    }

    @PostMapping("/{id}/vote")
    public void castVote(HttpServletRequest request,
                         @PathVariable String id,
                         @RequestBody VoteDTO vote) {
        String voterIp = request.getHeader("X-Forwarded-For");
        if (voterIp == null) {
            voterIp = request.getRemoteAddr();
        } else {
            voterIp = voterIp.split(",")[0];
        }
        pollService.castVote(id, vote.getOptionTexts(), voterIp.replace(".", "-"));
    }

    @GetMapping(value = "/{id}/votes", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Poll> getVoteUpdates(@PathVariable String id) {
        return pollService.getVoteUpdates(id);
    }
}
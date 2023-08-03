package com.ezpolls.controller;

import com.ezpolls.dto.PollCreationDTO;
import com.ezpolls.dto.PollResponseDTO;
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
    public Poll createPoll(@RequestBody PollCreationDTO pollCreationDTO, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        return pollService.createPoll(pollCreationDTO, username);
    }

    @GetMapping("/{id}")
    public PollResponseDTO getPoll(HttpServletRequest request, @PathVariable String id) {
        String voterIp = (String) request.getAttribute("ip");
        String username = (String) request.getAttribute("username");
        return pollService.getPoll(id, voterIp.replace(".", "-"), username);
    }

    @PostMapping("/{id}/vote")
    public void castVote(HttpServletRequest request, @PathVariable String id, @RequestBody VoteDTO vote) {
        String voterIp = (String) request.getAttribute("ip");
        String username = (String) request.getAttribute("username");
        pollService.castVote(id, vote.getOptionTexts(), voterIp.replace(".", "-"), username);
    }

    @GetMapping(value = "/{id}/votes", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Poll> getVoteUpdates(@PathVariable String id) {
        return pollService.getVoteUpdates(id);
    }

    @DeleteMapping("/{id}")
    public void deletePoll(HttpServletRequest request, @PathVariable String id) {
        String username = (String) request.getAttribute("username");
        pollService.deletePoll(id, username);
    }
}
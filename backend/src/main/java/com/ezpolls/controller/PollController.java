package com.ezpolls.controller;

import com.ezpolls.model.Poll;
import com.ezpolls.service.PollService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    private final PollService pollService;

    @Autowired
    public PollController(PollService pollService) {
        this.pollService = pollService;
    }

    @PostMapping
    public Poll createPoll(@RequestBody Poll poll) {
        return pollService.createPoll(poll);
    }

    @GetMapping("/{id}")
    public Poll getPoll(@PathVariable String id) {
        return pollService.getPoll(id);
    }

    @PostMapping("/{id}/vote")
    public void castVote(HttpServletRequest request,
                         @PathVariable String id,
                         @RequestParam String optionText) {
        String voterIp = request.getHeader("X-Forwarded-For");
        if (voterIp == null) {
            voterIp = request.getRemoteAddr();
        } else {
            voterIp = voterIp.split(",")[0];
        }
        pollService.castVote(id, optionText, voterIp);
    }
}
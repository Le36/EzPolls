package com.ezpolls.controller;

import com.ezpolls.dto.PollCreationDTO;
import com.ezpolls.dto.VoteDTO;
import com.ezpolls.exception.RateLimitException;
import com.ezpolls.model.Poll;
import com.ezpolls.security.JwtUtil;
import com.ezpolls.service.PollService;
import com.ezpolls.service.RateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.Optional;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    private final PollService pollService;
    private final RateLimiter rateLimiter;
    private final JwtUtil jwtUtil;

    @Autowired
    public PollController(PollService pollService, RateLimiter rateLimiter, JwtUtil jwtUtil) {
        this.pollService = pollService;
        this.rateLimiter = rateLimiter;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public Poll createPoll(@RequestBody PollCreationDTO pollCreationDTO, HttpServletRequest request) {
        String ip = getClientIp(request);
        if (rateLimiter.tryConsume(ip)) {
            throw new RateLimitException();
        }

        Optional<String> username = jwtUtil.extractUsernameFromHeader(request.getHeader("Authorization"));

        return pollService.createPoll(pollCreationDTO, username.orElse(null));
    }

    @GetMapping("/{id}")
    public Poll getPoll(@PathVariable String id) {
        return pollService.getPoll(id);
    }

    @PostMapping("/{id}/vote")
    public void castVote(HttpServletRequest request,
                         @PathVariable String id,
                         @RequestBody VoteDTO vote) {
        String voterIp = getClientIp(request);
        if (rateLimiter.tryConsume(voterIp)) {
            throw new RateLimitException();
        }
        pollService.castVote(id, vote.getOptionTexts(), voterIp.replace(".", "-"));
    }

    @GetMapping(value = "/{id}/votes", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Poll> getVoteUpdates(@PathVariable String id) {
        return pollService.getVoteUpdates(id);
    }

    private String getClientIp(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        } else {
            ipAddress = ipAddress.split(",")[0];
        }
        return ipAddress;
    }
}
package com.ezpolls.service;

import com.ezpolls.dto.PollCreationDTO;
import com.ezpolls.model.Poll;
import com.ezpolls.model.VoteRecord;
import com.ezpolls.repository.PollRepository;
import com.ezpolls.repository.VoteRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final VoteRecordRepository voteRecordRepository;

    @Autowired
    public PollService(PollRepository pollRepository, VoteRecordRepository voteRecordRepository) {
        this.pollRepository = pollRepository;
        this.voteRecordRepository = voteRecordRepository;
    }

    public Poll createPoll(PollCreationDTO pollCreationDTO) {
        Poll poll = new Poll();
        poll.setQuestion(pollCreationDTO.getQuestion());
        poll.setVotingRestriction(pollCreationDTO.getVotingRestriction());
        poll.setMultipleChoicesAllowed(pollCreationDTO.isMultipleChoicesAllowed());

        List<Poll.Option> options = pollCreationDTO.getOptions().stream()
                .map(optionText -> {
                    Poll.Option option = new Poll.Option();
                    option.setOptionText(optionText);
                    return option;
                })
                .collect(Collectors.toList());

        poll.setOptions(options);

        return pollRepository.save(poll);
    }

    public Poll getPoll(String id) {
        return pollRepository.findById(id).orElseThrow(() -> new RuntimeException("Poll not found"));
    }

    public void castVote(String pollId, List<String> optionTexts, String voterIp) {
        String userId = "TODO: get user id from session";
        Poll poll = getPoll(pollId);
        if (poll == null) {
            throw new RuntimeException("Poll not found");
        }

        VoteRecord voteRecord = voteRecordRepository.findByPollId(pollId);
        if (voteRecord == null) {
            voteRecord = new VoteRecord();
            voteRecord.setPollId(pollId);
        }

        if (poll.isMultipleChoicesAllowed()) {
            for (String optionText : optionTexts) {
                voteForOption(poll, voteRecord, voterIp, userId, optionText);
            }
        } else {
            if (optionTexts.size() > 1) {
                throw new IllegalArgumentException("Multiple choices not allowed for this poll");
            }
            voteForOption(poll, voteRecord, voterIp, userId, optionTexts.get(0));
        }

        pollRepository.save(poll);
        voteRecordRepository.save(voteRecord);
    }

    private void voteForOption(Poll poll, VoteRecord voteRecord, String voterIp, String userId, String optionText) {
        List<String> previousVotes;
        switch (poll.getVotingRestriction()) {
            case ONE_VOTE_PER_IP -> {
                previousVotes = voteRecord.getVotesByIp().get(voterIp);
                if (previousVotes != null) {
                    previousVotes.forEach(previousVote -> decrementVoteCount(poll, previousVote));
                }
                voteRecord.getVotesByIp().put(voterIp, Collections.singletonList(optionText));
            }
            case ONE_VOTE_PER_USER -> {
                previousVotes = voteRecord.getVotesByUserId().get(userId);
                if (previousVotes != null) {
                    previousVotes.forEach(previousVote -> decrementVoteCount(poll, previousVote));
                }
                voteRecord.getVotesByUserId().put(userId, Collections.singletonList(optionText));
            }
            case NO_RESTRICTION -> {
            }
        }

        incrementVoteCount(poll, optionText);
    }

    private void incrementVoteCount(Poll poll, String optionText) {
        for (Poll.Option option : poll.getOptions()) {
            if (option.getOptionText().equals(optionText)) {
                option.setVoteCount(option.getVoteCount() + 1);
                break;
            }
        }
    }

    private void decrementVoteCount(Poll poll, String optionText) {
        for (Poll.Option option : poll.getOptions()) {
            if (option.getOptionText().equals(optionText)) {
                option.setVoteCount(option.getVoteCount() - 1);
                break;
            }
        }
    }

    public Flux<Poll> getVoteUpdates(String pollId) {
        return Flux.interval(Duration.ofSeconds(1))
                .publishOn(Schedulers.boundedElastic())
                .flatMap(seq -> Flux.just(Objects.requireNonNull(pollRepository.findById(pollId).orElse(null))))
                .distinctUntilChanged();
    }
}
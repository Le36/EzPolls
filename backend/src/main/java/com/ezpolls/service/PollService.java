package com.ezpolls.service;

import com.ezpolls.dto.PollCreationDTO;
import com.ezpolls.dto.PollResponseDTO;
import com.ezpolls.event.VoteCastEvent;
import com.ezpolls.exception.PollNotFoundException;
import com.ezpolls.exception.UnauthorizedAccessException;
import com.ezpolls.exception.UserNotLoggedInException;
import com.ezpolls.exception.VoteNotPermittedException;
import com.ezpolls.model.Poll;
import com.ezpolls.model.VoteRecord;
import com.ezpolls.repository.PollRepository;
import com.ezpolls.repository.VoteRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ApplicationEventMulticaster;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final VoteRecordRepository voteRecordRepository;
    private final ApplicationEventMulticaster applicationEventMulticaster;

    @Autowired
    public PollService(PollRepository pollRepository,
                       VoteRecordRepository voteRecordRepository,
                       ApplicationEventMulticaster applicationEventMulticaster) {
        this.pollRepository = pollRepository;
        this.voteRecordRepository = voteRecordRepository;
        this.applicationEventMulticaster = applicationEventMulticaster;
    }

    public Poll createPoll(PollCreationDTO pollCreationDTO, String username) {
        Poll poll = new Poll();
        poll.setQuestion(pollCreationDTO.getQuestion());
        poll.setVotingRestriction(pollCreationDTO.getVotingRestriction());
        poll.setMultipleChoicesAllowed(pollCreationDTO.isMultipleChoicesAllowed());
        poll.setRevotingAllowed(pollCreationDTO.isRevotingAllowed());
        poll.setAuthor(username);

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

    public PollResponseDTO getPoll(String id, String ip, String username) {
        Poll poll = getPoll(id);
        PollResponseDTO pollResponseDTO = new PollResponseDTO();
        pollResponseDTO.setPoll(poll);

        VoteRecord voteRecord = voteRecordRepository.findByPollId(id);
        if (voteRecord != null) {
            switch (poll.getVotingRestriction()) {
                case ONE_VOTE_PER_IP -> {
                    if (ip != null) {
                        List<String> votes = voteRecord.getVotesByIp().get(ip);
                        if (votes != null && !votes.isEmpty()) {
                            pollResponseDTO.setUserVotes(votes);
                        }
                    }
                }
                case ONE_VOTE_PER_USER -> {
                    if (username != null) {
                        List<String> votes = voteRecord.getVotesByUserId().get(username);
                        if (votes != null && !votes.isEmpty()) {
                            pollResponseDTO.setUserVotes(votes);
                        }
                    }
                }
                case NO_RESTRICTION -> {
                }
            }
        }
        return pollResponseDTO;
    }

    public Poll getPoll(String id) {
        return pollRepository.findById(id).orElseThrow(PollNotFoundException::new);
    }

    public void castVote(String pollId, List<String> optionTexts, String voterIp, String username) {
        Poll poll = getPoll(pollId);

        VoteRecord voteRecord = voteRecordRepository.findByPollId(pollId);
        if (voteRecord == null) {
            voteRecord = new VoteRecord();
            voteRecord.setPollId(pollId);
        }

        List<String> previousVotes;
        switch (poll.getVotingRestriction()) {
            case ONE_VOTE_PER_IP -> {
                previousVotes = voteRecord.getVotesByIp().get(voterIp);
                if (previousVotes != null && !poll.isRevotingAllowed()) {
                    throw new VoteNotPermittedException();
                } else if (previousVotes != null) {
                    previousVotes.forEach(previousVote -> decrementVoteCount(poll, previousVote));
                }
                voteRecord.getVotesByIp().put(voterIp, new ArrayList<>());
            }
            case ONE_VOTE_PER_USER -> {
                if (username == null) throw new UserNotLoggedInException();

                previousVotes = voteRecord.getVotesByUserId().get(username);
                if (previousVotes != null && !poll.isRevotingAllowed()) {
                    throw new VoteNotPermittedException();
                } else if (previousVotes != null) {
                    previousVotes.forEach(previousVote -> decrementVoteCount(poll, previousVote));
                }
                voteRecord.getVotesByUserId().put(username, new ArrayList<>());
            }
            case NO_RESTRICTION -> {
            }
        }

        for (String optionText : optionTexts) {
            incrementVoteCount(poll, optionText);
            if (poll.getVotingRestriction() == Poll.VotingRestriction.ONE_VOTE_PER_IP) {
                voteRecord.getVotesByIp().get(voterIp).add(optionText);
            } else if (poll.getVotingRestriction() == Poll.VotingRestriction.ONE_VOTE_PER_USER) {
                voteRecord.getVotesByUserId().get(username).add(optionText);
            }
        }

        pollRepository.save(poll);
        voteRecordRepository.save(voteRecord);
        applicationEventMulticaster.multicastEvent(new VoteCastEvent(this, pollId));
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
        return Flux.create(emitter -> {
                    ApplicationListener<VoteCastEvent> listener = event -> {
                        if (event.getPollId().equals(pollId)) {
                            Mono.fromCallable(() -> pollRepository.findById(pollId))
                                    .subscribeOn(Schedulers.boundedElastic())
                                    .subscribe(poll -> poll.ifPresent(emitter::next));
                        }
                    };

                    emitter.onRequest(v -> applicationEventMulticaster.addApplicationListener(listener));
                    emitter.onDispose(() -> applicationEventMulticaster.removeApplicationListener(listener));
                })
                .bufferTimeout(100, Duration.ofMillis(300))
                .map(list -> (Poll) list.get(list.size() - 1));
    }

    public void deletePoll(String pollId, String username) {
        Poll poll = getPoll(pollId);
        if (poll.getAuthor() != null && poll.getAuthor().equals(username)) {
            pollRepository.deleteById(pollId);
            voteRecordRepository.deleteById(pollId);
        } else {
            throw new UnauthorizedAccessException();
        }
    }

    public List<Poll> getPollsByUser(String username) {
        return pollRepository.findAllByAuthor(username);
    }
}
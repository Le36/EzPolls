package com.ezpolls.repository;

import com.ezpolls.model.Poll;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface PollRepository extends MongoRepository<Poll, String> {
    List<Poll> findAllByAuthor(String username);
}
package com.ezpolls.repository;

import com.ezpolls.model.Poll;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface PollRepository extends MongoRepository<Poll, String> {
}
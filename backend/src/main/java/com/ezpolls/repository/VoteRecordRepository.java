package com.ezpolls.repository;

import com.ezpolls.model.VoteRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VoteRecordRepository extends MongoRepository<VoteRecord, String> {
    VoteRecord findByPollId(String pollId);
}
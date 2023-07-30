package com.ezpolls.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "voteRecords")
public class VoteRecord {

    @Id
    private String pollId;
    private Map<String, List<String>> votesByIp = new HashMap<>();
    private Map<String, List<String>> votesByUserId = new HashMap<>();

}
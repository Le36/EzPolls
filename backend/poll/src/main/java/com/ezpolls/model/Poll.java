package com.ezpolls.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "polls")
public class Poll {

    @Id
    private String id;
    private String question;
    private List<String> options;

}
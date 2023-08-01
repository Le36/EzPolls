package com.ezpolls.controller;

import com.ezpolls.dto.UserRegistrationDTO;
import com.ezpolls.model.User;
import com.ezpolls.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        return userService.createUser(userRegistrationDTO);
    }
}
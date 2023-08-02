package com.ezpolls.controller;

import com.ezpolls.dto.UserLoginDTO;
import com.ezpolls.dto.UserRegistrationDTO;
import com.ezpolls.exception.InvalidCredentialsException;
import com.ezpolls.model.User;
import com.ezpolls.security.JwtUtil;
import com.ezpolls.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        return userService.createUser(userRegistrationDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDTO userLoginDTO) {
        Optional<User> userOptional = userService.validateUserCredentials(userLoginDTO);
        if (userOptional.isEmpty()) {
            throw new InvalidCredentialsException();
        }

        User user = userOptional.get();
        String jwt = jwtUtil.generateToken(user);
        return ResponseEntity.ok(jwt);
    }
}
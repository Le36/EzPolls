package com.ezpolls.controller;

import com.ezpolls.dto.*;
import com.ezpolls.exception.InvalidCredentialsException;
import com.ezpolls.exception.UnauthorizedAccessException;
import com.ezpolls.model.User;
import com.ezpolls.security.JwtUtil;
import com.ezpolls.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{username}")
    public UserPollsDTO getUserProfile(@PathVariable String username, HttpServletRequest request) {
        String requesterUsername = (String) request.getAttribute("username");
        if (!username.equals(requesterUsername)) {
            throw new UnauthorizedAccessException();
        }
        return userService.getUserAndTheirPolls(username);
    }

    @PutMapping("/{username}/password")
    public User updateUserPassword(@PathVariable String username, @RequestBody PasswordChangeDTO passwordChangeDTO, HttpServletRequest request) {
        String requesterUsername = (String) request.getAttribute("username");
        if (!username.equals(requesterUsername)) {
            throw new UnauthorizedAccessException();
        }
        return userService.updateUserPassword(username, passwordChangeDTO);
    }

    @PutMapping("/{username}/email")
    public User updateUserEmail(@PathVariable String username, @RequestBody EmailUpdateDTO emailUpdateDTO, HttpServletRequest request) {
        String requesterUsername = (String) request.getAttribute("username");
        if (!username.equals(requesterUsername)) {
            throw new UnauthorizedAccessException();
        }
        return userService.updateUserEmail(username, emailUpdateDTO.getEmail());
    }
}
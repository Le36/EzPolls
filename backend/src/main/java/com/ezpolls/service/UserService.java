package com.ezpolls.service;

import com.ezpolls.dto.PasswordChangeDTO;
import com.ezpolls.dto.UserPollsDTO;
import com.ezpolls.dto.UserRegistrationDTO;
import com.ezpolls.dto.UserLoginDTO;
import com.ezpolls.exception.*;
import com.ezpolls.model.Poll;
import com.ezpolls.model.User;
import com.ezpolls.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final PollService pollService;


    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, PollService pollService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.pollService = pollService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    public User createUser(UserRegistrationDTO userRegistrationDTO) {
        String username = userRegistrationDTO.getUsername();
        String password = userRegistrationDTO.getPassword();
        String email = userRegistrationDTO.getEmail();
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException(username);
        }

        if (!isValidUsername(username)) {
            throw new InvalidUsernameException();
        }

        if (!isValidPassword(password)) {
            throw new InvalidPasswordException();
        }

        if (!isValidEmail(email)) {
            throw new InvalidEmailException();
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEmail(email);
        return userRepository.save(newUser);
    }

    public Optional<User> validateUserCredentials(UserLoginDTO userLoginDTO) {
        Optional<User> optionalUser = userRepository.findByUsername(userLoginDTO.getUsername());
        if (optionalUser.isPresent() && passwordEncoder.matches(userLoginDTO.getPassword(), optionalUser.get().getPassword())) {
            return optionalUser;
        }
        return Optional.empty();
    }

    public UserPollsDTO getUserAndTheirPolls(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);
        List<Poll> polls = pollService.getPollsByUser(username);
        UserPollsDTO userPolls = new UserPollsDTO();
        userPolls.setUser(user);
        userPolls.setPolls(polls);
        return userPolls;
    }

    public User updateUserPassword(String username, PasswordChangeDTO passwordChangeDTO) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(passwordChangeDTO.getOldPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        if (!isValidPassword(passwordChangeDTO.getNewPassword())) {
            throw new InvalidPasswordException();
        }

        user.setPassword(passwordEncoder.encode(passwordChangeDTO.getNewPassword()));
        return userRepository.save(user);
    }

    public User updateUserEmail(String username, String newEmail) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);

        if (!isValidEmail(newEmail)) {
            throw new InvalidEmailException();
        }

        user.setEmail(newEmail);
        return userRepository.save(user);
    }

    public boolean isValidPassword(String password) {
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    public boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public boolean isValidUsername(String username) {
        String usernameRegex = "^[a-zA-Z0-9]{4,}$";
        Pattern pattern = Pattern.compile(usernameRegex);
        Matcher matcher = pattern.matcher(username);
        return matcher.matches();
    }
}
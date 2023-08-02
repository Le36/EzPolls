package com.ezpolls.service;

import com.ezpolls.dto.UserRegistrationDTO;
import com.ezpolls.dto.UserLoginDTO;
import com.ezpolls.exception.InvalidCredentialsException;
import com.ezpolls.exception.UserAlreadyExistsException;
import com.ezpolls.model.User;
import com.ezpolls.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    public User createUser(UserRegistrationDTO userRegistrationDTO) {
        String username = userRegistrationDTO.getUsername();
        Optional<User> existingUser = userRepository.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException(username);
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        return userRepository.save(newUser);
    }

    public Optional<User> validateUserCredentials(UserLoginDTO userLoginDTO) {
        Optional<User> optionalUser = userRepository.findByUsername(userLoginDTO.getUsername());
        if (optionalUser.isPresent() && passwordEncoder.matches(userLoginDTO.getPassword(), optionalUser.get().getPassword())) {
            return optionalUser;
        }
        return Optional.empty();
    }
}
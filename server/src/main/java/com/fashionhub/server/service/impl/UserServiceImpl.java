package com.fashionhub.server.service.impl;

import com.fashionhub.server.exception.EmailAlreadyExistsException;
import com.fashionhub.server.exception.InvalidCredentialsException;
import com.fashionhub.server.model.User;
import com.fashionhub.server.repository.UserRepository;
import com.fashionhub.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public User loginUser(User userInput) {

            String email = userInput.getEmail();
            User existingUser =  userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

            if(!encoder.matches(userInput.getPassword(),existingUser.getPassword())){
                throw new InvalidCredentialsException("Invalid credentials");
            }

            return existingUser;


    }

    @Override
    public User addUser(User user){
        try{
            String encodedPassword = encoder.encode(user.getPassword());
            user.setPassword(encodedPassword);

            return  userRepository.save(user);
        }catch (DuplicateKeyException ex) {
            throw  new EmailAlreadyExistsException("Email already exists");
        }

    }
}

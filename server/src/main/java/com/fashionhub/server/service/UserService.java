package com.fashionhub.server.service;

import com.fashionhub.server.model.User;

import java.util.List;

public interface UserService {
    User loginUser(User user);
    User addUser(User user);
    List<String> addToCart(String id,List<String> pid);
}
package com.fashionhub.server.service;

import com.fashionhub.server.model.User;

import java.util.List;

public interface UserService {
    User loginUser(User user);
    User addUser(User user);
    String addToCart(String id,String product_id);
}
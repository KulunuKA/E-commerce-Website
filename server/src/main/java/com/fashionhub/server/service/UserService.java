package com.fashionhub.server.service;

import com.fashionhub.server.dto.AddToCartRequest;
import com.fashionhub.server.model.Cart;
import com.fashionhub.server.model.CartItem;
import com.fashionhub.server.model.User;

import java.util.List;

public interface UserService {
    User loginUser(User user);
    User addUser(User user);
    CartItem addToCart(String id, CartItem cart);
    Cart getCartById(String id);
    String removeFromCart(String id,String productId);
}
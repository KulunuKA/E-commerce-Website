package com.fashionhub.server.service.impl;

import com.fashionhub.server.dto.AddToCartRequest;
import com.fashionhub.server.exception.EmailAlreadyExistsException;
import com.fashionhub.server.exception.InvalidCredentialsException;
import com.fashionhub.server.exception.NotFoundException;
import com.fashionhub.server.model.Cart;
import com.fashionhub.server.model.CartItem;
import com.fashionhub.server.model.User;
import com.fashionhub.server.repository.CartRepository;
import com.fashionhub.server.repository.UserRepository;
import com.fashionhub.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public User loginUser(User userInput) {

        String email = userInput.getEmail();
        User existingUser = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(userInput.getPassword(), existingUser.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        return existingUser;


    }

    @Override
    public User addUser(User user) {
        try {
            String encodedPassword = encoder.encode(user.getPassword());
            user.setPassword(encodedPassword);

            return userRepository.save(user);
        } catch (DuplicateKeyException ex) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

    }

    public CartItem addToCart(String userId, CartItem req) {
        User user =
                userRepository.findById(userId
        ).orElseThrow(() -> new NotFoundException("User not found"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElse(new Cart(null, userId, new ArrayList<>())
                );

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId() != null &&
                        item.getProductId().equals(req.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            // Increase quantity
            existingItem.get().setQuantity(
                    existingItem.get().getQuantity() + req.getQuantity()
            );
        } else {
            // Add new item
            CartItem newItem =new CartItem(req.getProductId(),
                    req.getQuantity(),req.getSize(), req.getPrice(),
                    req.getImage(),req.getName());

            cart.getItems().add(newItem);
        }

        // Save cart
        Cart saved = cartRepository.save(cart);

        return saved.getItems().getLast();

    }

    public Cart getCartById(String userId){
        Cart cart =
                cartRepository.findByUserId(userId).orElse(new Cart(null,
                        userId,new ArrayList<CartItem>()));

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        return cart;
    }

    public String removeFromCart(String id,String productId){

        Cart cart = cartRepository.findById(id)
                .orElseThrow(()-> new NotFoundException("Cart not found"));

       List<CartItem> update =
               cart.getItems().stream().filter(item  -> !Objects.equals(item.getProductId(), productId)).collect(Collectors.toList());;

       cart.setItems(update);

       cartRepository.save(cart);

        return productId;
    }
}

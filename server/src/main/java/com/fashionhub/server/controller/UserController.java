package com.fashionhub.server.controller;

import com.fashionhub.server.dto.AddToCartRequest;
import com.fashionhub.server.exception.EmailAlreadyExistsException;
import com.fashionhub.server.exception.InvalidCredentialsException;
import com.fashionhub.server.model.Cart;
import com.fashionhub.server.model.CartItem;
import com.fashionhub.server.model.ProductIdRequest;
import com.fashionhub.server.model.User;
import com.fashionhub.server.service.UserService;
import com.fashionhub.server.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/fashionhub/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> loginUser(@RequestBody User user) {

        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse<>(null, "Email is required", 1));
        }

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse<>(null, "Password is required", 1));
        }

        User createdUser = userService.loginUser(user);
        createdUser.setPassword(null);

        return ResponseEntity.ok(new ApiResponse<>(createdUser, "Successfully login", 0));


    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> addUser(@RequestBody @Valid User user) {

        User createdUser = userService.addUser(user);
        createdUser.setPassword(null);

        return ResponseEntity.ok(new ApiResponse<>(createdUser, "User created", 0));


    }

    @PostMapping("/cart/{id}")
    public ResponseEntity<ApiResponse<CartItem>> addToCart(@PathVariable String id,
                                                    @RequestBody CartItem cart){
        CartItem cartItem = userService.addToCart(id,cart);

        return ResponseEntity.ok(new ApiResponse<>(cartItem, "Successfully added!",
                0));
    }

    @GetMapping("/cart/{id}")
    public ResponseEntity<ApiResponse<Cart>> getCart(@PathVariable String id){
        Cart cartItem = userService.getCartById(id);

        return ResponseEntity.ok(new ApiResponse<>(cartItem, "Successfully added!",
                0));
    }

    @DeleteMapping("/cart/{id}/{productId}")
    public ResponseEntity<ApiResponse<String>> removeFromCart(@PathVariable String id,@PathVariable String productId){
        String deleteId = userService.removeFromCart(id,productId);

        return ResponseEntity.ok(new ApiResponse<>(deleteId, "Successfully " +
                "removed!",
                0));
    }
}

package com.fashionhub.server.controller;

import com.fashionhub.server.exception.EmailAlreadyExistsException;
import com.fashionhub.server.exception.InvalidCredentialsException;
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

    @PutMapping("/addtocart/{id}")
    public ResponseEntity<ApiResponse<String>> addToCart(@PathVariable String id,
                                                    @RequestBody ProductIdRequest product_id){
        String pid = userService.addToCart(id,product_id.getProduct_id());

        return ResponseEntity.ok(new ApiResponse<>(pid, "Successfully added!",
                0));
    }

}

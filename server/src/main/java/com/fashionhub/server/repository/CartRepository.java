package com.fashionhub.server.repository;

import com.fashionhub.server.model.Cart;
import com.fashionhub.server.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart,String> {
   Optional<Cart> findByUserId(String userId);
}

package com.fashionhub.server.repository;

import com.fashionhub.server.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin,String> {
    Optional<Admin> findByEmail(String email);
}

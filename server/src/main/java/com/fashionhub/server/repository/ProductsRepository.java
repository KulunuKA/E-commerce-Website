package com.fashionhub.server.repository;

import com.fashionhub.server.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface ProductsRepository extends MongoRepository<Product,String> {
    List<Product> findByCategory(String category, Pageable pageable);
    List<Product> findByCategoryAndGender(String category, String gender,
                                          Pageable pageable);
    List<Product> findByCategory(String category);

}

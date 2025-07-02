package com.fashionhub.server.service;

import com.fashionhub.server.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts(String gender,String category,int limit);
    Product getProductById(String id);
    List<String> autocompleteSuggestions(String keyword);

}

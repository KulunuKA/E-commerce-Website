package com.fashionhub.server.service.impl;

import com.fashionhub.server.exception.NotFoundException;
import com.fashionhub.server.model.Product;
import com.fashionhub.server.repository.ProductsRepository;
import com.fashionhub.server.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductsRepository productsRepository;

    public List<Product> getAllProducts(String category,int limit){
        if(!category.equals("all")){
            Pageable pageable = PageRequest.of(0, limit);
            System.out.println(category+limit+" category filtering");
            return productsRepository.findByCategory(category,pageable);
        }
        return productsRepository.findAll();
    }

    public Product getProductById(String id){
        return productsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));
    }

}

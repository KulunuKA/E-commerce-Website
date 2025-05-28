package com.fashionhub.server.controller;

import com.fashionhub.server.model.Product;
import com.fashionhub.server.service.ProductService;
import com.fashionhub.server.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/fashionhub/products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getProducts(
            @RequestParam(required = false, defaultValue = "all") String category,
            @RequestParam(required = false,defaultValue = "4") int limit
    ) {
        System.out.println(category);
        List<Product> products = productService.getAllProducts(category,limit);
        return ResponseEntity.ok(new ApiResponse<>(products, "Successfully fetched data", 0));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable String id) {
        System.out.println("product id = " + id);
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(new ApiResponse<>(product, "Successfully fetched data", 0));
    }
}

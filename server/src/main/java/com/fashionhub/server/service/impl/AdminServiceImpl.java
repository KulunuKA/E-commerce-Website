package com.fashionhub.server.service.impl;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import com.fashionhub.server.exception.EmailAlreadyExistsException;
import com.fashionhub.server.exception.InvalidCredentialsException;
import com.fashionhub.server.exception.NotFoundException;
import com.fashionhub.server.model.Admin;
import com.fashionhub.server.model.Product;
import com.fashionhub.server.repository.AdminRepository;
import com.fashionhub.server.repository.ProductsRepository;
import com.fashionhub.server.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ElasticsearchClient esClient;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    public Admin addAdmin(Admin req) {
        try {
            String encodedPassword = encoder.encode(req.getPassword());
            req.setPassword(encodedPassword);

            return adminRepository.save(req);
        } catch (DuplicateKeyException ex) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
    }

    public Admin loginAdmin(Admin req) {
        String email = req.getEmail();
        Admin existingUser =
                adminRepository.findByEmail(email).orElseThrow(() -> new RuntimeException(
                        "Admin not found"));

        if (!encoder.matches(req.getPassword(), existingUser.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        return existingUser;

    }

    public Product addProduct(Product req) {
        Product saved =  productsRepository.save(req);

        try {
            esClient.index(
                    i -> i
                            .index("products")
                            .id(saved.getId())
                            .document(saved)
            );
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return saved;    }

    public Product updateProduct(String id, Product req) {
        Product existingProduct =
                productsRepository.findById(id).orElseThrow(() -> new NotFoundException("Product not found"));

        existingProduct.setName(req.getName());
        existingProduct.setPrice(req.getPrice());
        existingProduct.setDescription(req.getDescription());
        existingProduct.setAvailable(req.isAvailable());
        existingProduct.setImages(req.getImages());
        existingProduct.setBrand(req.getBrand());
        existingProduct.setMaterial(req.getMaterial());
        existingProduct.setWeight(req.getWeight());
        existingProduct.setCategory(req.getCategory());
        existingProduct.setSize(req.getSize());
        existingProduct.setGender(req.getGender());
        existingProduct.setStock(req.getStock());

        Product saved = productsRepository.save(existingProduct);

        try {
            esClient.index(i -> i
                    .index("products")
                    .id(saved.getId())
                    .document(saved)
            );
        }  catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        return saved;
    }

    public Product deleteProduct(String id) {
        Optional<Product> existingProduct = productsRepository.findById(id);

        if (existingProduct.isPresent()) {
            productsRepository.deleteById(id);
            return existingProduct.get();
        } else {
            throw new NotFoundException("Product not found with ID: " + id);
        }
    }
}


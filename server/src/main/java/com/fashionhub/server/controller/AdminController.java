package com.fashionhub.server.controller;


import com.fashionhub.server.model.Admin;
import com.fashionhub.server.model.Product;
import com.fashionhub.server.service.AdminService;
import com.fashionhub.server.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/fashionhub/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<ApiResponse<Admin>> addAdmin(@RequestBody @Valid Admin req) {

        Admin createdUser = adminService.addAdmin(req);
        createdUser.setPassword(null);

        return ResponseEntity.ok(new ApiResponse<>(createdUser, "User created", 0));


    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Admin>> loginAdmin(@RequestBody Admin req) {

        Admin createdUser = adminService.loginAdmin(req);
        createdUser.setPassword(null);

        return ResponseEntity.ok(new ApiResponse<>(createdUser, "login " +
                "successfully", 0));


    }

    @PostMapping("/addproduct")
    public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody @Valid Product req) {

        Product newProduct = adminService.addProduct(req);

        return ResponseEntity.ok(new ApiResponse<>(newProduct, "added", 0));

    }

    @PutMapping("/updateproduct/{id}")
    public ResponseEntity<ApiResponse<Product>> updateProduct(@PathVariable String id, @RequestBody @Valid Product req) {
        if(id.isEmpty()){
            return ResponseEntity.badRequest().body(new ApiResponse<>(null,
                    "Product id" +
                    " is required", 1));
        }
        Product newProduct = adminService.updateProduct(id, req);

        return ResponseEntity.ok(new ApiResponse<>(newProduct, "Updated", 0));

    }

    @DeleteMapping("/deleteproduct/{id}")
    public ResponseEntity<ApiResponse<Product>> deleteProduct(@PathVariable String id) {
        if(id.isEmpty()){
            return ResponseEntity.badRequest().body(new ApiResponse<>(null,
                    "Product id" +
                            " is required", 1));
        }
        Product newProduct = adminService.deleteProduct(id);

        return ResponseEntity.ok(new ApiResponse<>(newProduct, "Deleted", 0));

    }
}

package com.fashionhub.server.model;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String role = "Customer";

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private List<String> cart_item_ids;

    private List<Token> tokens;

    public void setRole(String role) {
        this.role = (role == null) ? "Customer" : role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getCart_item_ids() {
        return cart_item_ids;
    }

    public void setCart_item_ids(List<String> cart_item_ids) {
        this.cart_item_ids = cart_item_ids;
    }

    public String getRole() {
        return role;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Token {
        private String token;
    }
}

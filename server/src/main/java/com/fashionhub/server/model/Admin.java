package com.fashionhub.server.model;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@Document(collection = "admins")
public class Admin {
    @Id
    String id;

    @NotBlank(message = "Role is required")
    private String role = "Admin";

    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "password is required")
    private String password;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    public List<User.Token> getTokens() {
        return tokens;
    }

    public void setTokens(List<User.Token> tokens) {
        this.tokens = tokens;
    }

    private List<User.Token> tokens;
}

package com.fashionhub.server.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotEmpty(message = "At least one image is required")
    private List<String> images;

    @NotNull(message = "price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
    private Float price;

    @NotBlank(message = "description is required")
    private String description;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Material is required")
    private String material;

    @NotBlank(message = "Weight is required")
    private String weight;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Size is required")
    private String size;

    @NotNull(message = "Gender is required")
    @Pattern(regexp = "Male|Female|Kids|Unisex", message = "Gender must be one of: Male, Female, Kids, Unisex")
    private String  gender;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock must be >= 0")
    private Integer stock;

    private boolean available = true;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String  getGender() {
        return gender;
    }

    public void setGender(String  gender) {
        this.gender = gender;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public void setStock(Integer stock){this.stock = stock;};

    public Integer getStock(){return stock;};


}

package com.fashionhub.server.model;

import java.util.List;

public class ProductIdRequest {
    private String product_id;
    private List<String> product_ids;

    public ProductIdRequest(List<String> product_ids) {
        this.product_ids = product_ids;
    }

    public List<String> getProduct_ids() {
        return product_ids;
    }

    public void setProduct_ids(List<String> product_ids) {
        this.product_ids = product_ids;
    }

    public String getProduct_id() {
        return product_id;
    }

    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }
}

package com.fashionhub.server.service;

import com.fashionhub.server.model.Admin;
import com.fashionhub.server.model.Product;

public interface AdminService {
    Admin addAdmin(Admin req);
    Admin loginAdmin(Admin req);
    Product addProduct(Product req);
    Product updateProduct(String id,Product req);
    Product deleteProduct(String id);
}

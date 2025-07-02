package com.fashionhub.server.service.impl;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.fashionhub.server.exception.NotFoundException;
import com.fashionhub.server.model.Product;
import com.fashionhub.server.model.ProductDocument;
import com.fashionhub.server.repository.ProductsRepository;
import com.fashionhub.server.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ElasticsearchClient esClient;

    @Override
    public List<Product> getAllProducts(String gender, String category, int limit) {
        Pageable pageable = PageRequest.of(0, limit);

        if (!category.equals("clothing") && !category.equals("all") && !gender.equals("all")) {
            return productsRepository.findByCategoryAndGender(category, gender, pageable);
        } else if (!category.equals("clothing") && !category.equals("all") && gender.equals("all")) {
            System.out.println("gender,category---->>"+gender+category);
            return productsRepository.findByCategory(category);
        }

        return productsRepository.findAll(pageable).getContent();
    }

    @Override
    public Product getProductById(String id) {
        return productsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));
    }

    public List<String> searchProductIds(String keyword) throws IOException {
        SearchResponse<Void> response = esClient.search(s -> s
                        .index("products")
                        .query(q -> q
                                .match(m -> m
                                        .field("name")
                                        .query(keyword)
                                )
                        )
                        .source(src -> src
                                .filter(f -> f
                                        .includes(List.of("_id"))
                                )
                        ),
                Void.class
        );

        return response.hits().hits().stream()
                .map(hit -> hit.id())
                .collect(Collectors.toList());
    }

    public List<Product> getProductsByIds(List<String> ids) {
        return productsRepository.findAllById(ids);
    }

    public List<Product> searchProducts(String keyword) throws IOException {
        List<String> ids = searchProductIds(keyword);
        if (ids.isEmpty()) {
            return List.of();
        }
        return getProductsByIds(ids);
    }

    public List<String> autocompleteSuggestions(String keyword) {
        try {
            SearchResponse<Map> response = esClient.search(s ->
                            s.index("products")
                                    .query(q -> q.matchPhrasePrefix(m -> m.field("category").query(keyword)))
                                    .size(10),
                    Map.class);

            return response.hits().hits().stream()
                    .map(hit -> ((Map<String, Object>) hit.source()).get("category").toString())
                    .distinct()
                    .collect(Collectors.toList());


        } catch (Exception e) {
            System.out.println("error---->>"+e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

}

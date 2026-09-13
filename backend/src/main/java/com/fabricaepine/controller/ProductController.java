package com.fabricaepine.controller;

import com.fabricaepine.dto.ProductCategoryDto;
import com.fabricaepine.dto.ProductDto;
import com.fabricaepine.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<ProductDto> getAllProducts(@RequestParam(required = false) Long categoryId) {
        return productService.getAllProducts(categoryId);
    }

    @GetMapping("/products/{id}")
    public ProductDto getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/categories")
    public List<ProductCategoryDto> getAllCategories() {
        return productService.getAllCategories();
    }

    @GetMapping("/categories/{id}")
    public ProductCategoryDto getCategoryById(@PathVariable Long id) {
        return productService.getCategoryById(id);
    }
}
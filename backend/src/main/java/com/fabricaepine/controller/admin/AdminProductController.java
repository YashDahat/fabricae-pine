package com.fabricaepine.controller.admin;

import com.fabricaepine.dto.ProductCategoryDto;
import com.fabricaepine.dto.ProductDto;
import com.fabricaepine.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminProductController {

    private final ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/products")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto createProduct(@RequestBody ProductDto productDto) {
        return productService.createProduct(productDto);
    }

    @PutMapping("/products/{id}")
    public ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        return productService.updateProduct(id, productDto);
    }

    @DeleteMapping("/products/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @PostMapping("/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductCategoryDto createCategory(@RequestBody ProductCategoryDto categoryDto) {
        return productService.createCategory(categoryDto);
    }

    @PutMapping("/categories/{id}")
    public ProductCategoryDto updateCategory(@PathVariable Long id, @RequestBody ProductCategoryDto categoryDto) {
        return productService.updateCategory(id, categoryDto);
    }

    @DeleteMapping("/categories/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable Long id) {
        productService.deleteCategory(id);
    }
}
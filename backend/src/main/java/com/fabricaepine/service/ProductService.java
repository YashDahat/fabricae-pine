package com.fabricaepine.service;

import com.fabricaepine.dto.ProductCategoryDto;
import com.fabricaepine.dto.ProductDto;
import com.fabricaepine.exception.ResourceNotFoundException;
import com.fabricaepine.model.Product;
import com.fabricaepine.model.ProductCategory;
import com.fabricaepine.repository.ProductCategoryRepository;
import com.fabricaepine.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;

    public ProductService(ProductRepository productRepository, ProductCategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    public List<ProductDto> getAllProducts(Long categoryId) {
        List<Product> products;
        if (categoryId != null) {
            if (!productCategoryRepository.existsById(categoryId)) {
                throw new ResourceNotFoundException("ProductCategory with ID " + categoryId + " not found.");
            }
            products = productRepository.findByCategoryId(categoryId);
        } else {
            products = productRepository.findAll();
        }
        return products.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with ID " + id + " not found."));
        return convertToDto(product);
    }

    public ProductDto createProduct(ProductDto productDto) {
        if (productDto.getCategoryId() == null) {
            throw new IllegalArgumentException("Product category ID must be provided.");
        }
        ProductCategory category = productCategoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("ProductCategory with ID " + productDto.getCategoryId() + " not found."));

        Product product = convertToEntity(productDto);
        product.setCategory(category);
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with ID " + id + " not found."));

        if (productDto.getCategoryId() != null) {
            ProductCategory category = productCategoryRepository.findById(productDto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("ProductCategory with ID " + productDto.getCategoryId() + " not found."));
            existingProduct.setCategory(category);
        }

        existingProduct.setName(productDto.getName());
        existingProduct.setDescription(productDto.getDescription());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setMinimumOrderQuantity(productDto.getMinimumOrderQuantity());
        existingProduct.setImageUrl(productDto.getImageUrl());

        Product updatedProduct = productRepository.save(existingProduct);
        return convertToDto(updatedProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product with ID " + id + " not found.");
        }
        productRepository.deleteById(id);
    }

    public List<ProductCategoryDto> getAllCategories() {
        List<ProductCategory> categories = productCategoryRepository.findAll();
        return categories.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public ProductCategoryDto getCategoryById(Long id) {
        ProductCategory category = productCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProductCategory with ID " + id + " not found."));
        return convertToDto(category);
    }

    public ProductCategoryDto createCategory(ProductCategoryDto categoryDto) {
        ProductCategory category = convertToEntity(categoryDto);
        ProductCategory savedCategory = productCategoryRepository.save(category);
        return convertToDto(savedCategory);
    }

    public ProductCategoryDto updateCategory(Long id, ProductCategoryDto categoryDto) {
        ProductCategory existingCategory = productCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProductCategory with ID " + id + " not found."));

        existingCategory.setName(categoryDto.getName());
        existingCategory.setDescription(categoryDto.getDescription());

        ProductCategory updatedCategory = productCategoryRepository.save(existingCategory);
        return convertToDto(updatedCategory);
    }

    public void deleteCategory(Long id) {
        if (!productCategoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("ProductCategory with ID " + id + " not found.");
        }
        productCategoryRepository.deleteById(id);
    }

    private ProductDto convertToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .minimumOrderQuantity(product.getMinimumOrderQuantity())
                .imageUrl(product.getImageUrl())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .build();
    }

    private Product convertToEntity(ProductDto productDto) {
        Product product = new Product();
        product.setId(productDto.getId());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setMinimumOrderQuantity(productDto.getMinimumOrderQuantity());
        product.setImageUrl(productDto.getImageUrl());
        return product;
    }

    private ProductCategoryDto convertToDto(ProductCategory category) {
        return ProductCategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    private ProductCategory convertToEntity(ProductCategoryDto categoryDto) {
        ProductCategory category = new ProductCategory();
        category.setId(categoryDto.getId());
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        return category;
    }
}
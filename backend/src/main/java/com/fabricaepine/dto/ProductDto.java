package com.fabricaepine.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private java.math.BigDecimal price;
    private Integer minimumOrderQuantity;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;
}

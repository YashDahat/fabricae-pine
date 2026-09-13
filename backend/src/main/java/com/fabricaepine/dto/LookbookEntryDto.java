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
public class LookbookEntryDto {
    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private java.time.LocalDate publicationDate;
}

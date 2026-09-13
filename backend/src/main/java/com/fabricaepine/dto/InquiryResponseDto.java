package com.fabricaepine.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fabricaepine.model.InquiryStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryResponseDto {
    private Long id;
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private String companyName;
    private String productInterest;
    private Integer quantity;
    private String additionalDetails;
    private InquiryStatus status;
    private java.time.LocalDateTime submissionDate;
}

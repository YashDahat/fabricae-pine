package com.fabricaepine.service;

import com.fabricaepine.dto.InquiryRequestDto;
import com.fabricaepine.dto.InquiryResponseDto;
import com.fabricaepine.model.Inquiry;
import com.fabricaepine.model.InquiryStatus;
import com.fabricaepine.repository.InquiryRepository;
import com.fabricaepine.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    public InquiryResponseDto createInquiry(InquiryRequestDto inquiryRequestDto) {
        Inquiry inquiry = new Inquiry();
        inquiry.setClientName(inquiryRequestDto.getClientName());
        inquiry.setClientEmail(inquiryRequestDto.getClientEmail());
        inquiry.setClientPhone(inquiryRequestDto.getClientPhone());
        inquiry.setCompanyName(inquiryRequestDto.getCompanyName());
        inquiry.setProductInterest(inquiryRequestDto.getProductInterest());
        inquiry.setQuantity(inquiryRequestDto.getQuantity());
        inquiry.setAdditionalDetails(inquiryRequestDto.getAdditionalDetails());
        inquiry.setStatus(InquiryStatus.PENDING);
        inquiry.setSubmissionDate(LocalDateTime.now());

        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        return mapToDto(savedInquiry);
    }

    public List<InquiryResponseDto> getAllInquiries() {
        return inquiryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public InquiryResponseDto getInquiryById(Long id) {
        return inquiryRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));
    }

    public InquiryResponseDto updateInquiryStatus(Long id, InquiryStatus status) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));
        inquiry.setStatus(status);
        Inquiry updatedInquiry = inquiryRepository.save(inquiry);
        return mapToDto(updatedInquiry);
    }

    private InquiryResponseDto mapToDto(Inquiry inquiry) {
        return InquiryResponseDto.builder()
                .id(inquiry.getId())
                .clientName(inquiry.getClientName())
                .clientEmail(inquiry.getClientEmail())
                .clientPhone(inquiry.getClientPhone())
                .companyName(inquiry.getCompanyName())
                .productInterest(inquiry.getProductInterest())
                .quantity(inquiry.getQuantity())
                .additionalDetails(inquiry.getAdditionalDetails())
                .status(inquiry.getStatus())
                .submissionDate(inquiry.getSubmissionDate())
                .build();
    }
}
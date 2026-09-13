package com.fabricaepine.controller;

import com.fabricaepine.dto.InquiryRequestDto;
import com.fabricaepine.dto.InquiryResponseDto;
import com.fabricaepine.service.InquiryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping
    public ResponseEntity<InquiryResponseDto> createInquiry(@RequestBody InquiryRequestDto inquiryRequestDto) {
        InquiryResponseDto createdInquiry = inquiryService.createInquiry(inquiryRequestDto);
        return new ResponseEntity<>(createdInquiry, HttpStatus.CREATED);
    }
}
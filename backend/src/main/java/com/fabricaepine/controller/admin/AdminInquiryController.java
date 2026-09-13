package com.fabricaepine.controller.admin;

import com.fabricaepine.dto.InquiryResponseDto;
import com.fabricaepine.model.InquiryStatus;
import com.fabricaepine.service.InquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/inquiries")
public class AdminInquiryController {

    private final InquiryService inquiryService;

    public AdminInquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @GetMapping
    public List<InquiryResponseDto> getAllInquiries() {
        return inquiryService.getAllInquiries();
    }

    @GetMapping("/{id}")
    public InquiryResponseDto getInquiryById(@PathVariable Long id) {
        return inquiryService.getInquiryById(id);
    }

    @PutMapping("/{id}/status")
    public InquiryResponseDto updateInquiryStatus(@PathVariable Long id, @RequestBody InquiryStatus status) {
        return inquiryService.updateInquiryStatus(id, status);
    }
}
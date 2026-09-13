package com.fabricaepine.controller;

import com.fabricaepine.dto.LookbookEntryDto;
import com.fabricaepine.service.LookbookEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lookbook")
public class LookbookEntryController {

    private final LookbookEntryService lookbookEntryService;

    public LookbookEntryController(LookbookEntryService lookbookEntryService) {
        this.lookbookEntryService = lookbookEntryService;
    }

    @GetMapping
    public List<LookbookEntryDto> getAllLookbookEntries() {
        return lookbookEntryService.getAllLookbookEntries();
    }

    @GetMapping("/{id}")
    public LookbookEntryDto getLookbookEntryById(@PathVariable Long id) {
        return lookbookEntryService.getLookbookEntryById(id);
    }
}
package com.fabricaepine.controller.admin;

import com.fabricaepine.dto.LookbookEntryDto;
import com.fabricaepine.service.LookbookEntryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/lookbook")
public class AdminLookbookController {

    private final LookbookEntryService lookbookEntryService;

    public AdminLookbookController(LookbookEntryService lookbookEntryService) {
        this.lookbookEntryService = lookbookEntryService;
    }

    @PostMapping
    public LookbookEntryDto createLookbookEntry(@RequestBody LookbookEntryDto lookbookEntryDto) {
        return lookbookEntryService.createLookbookEntry(lookbookEntryDto);
    }

    @PutMapping("/{id}")
    public LookbookEntryDto updateLookbookEntry(@PathVariable Long id, @RequestBody LookbookEntryDto lookbookEntryDto) {
        return lookbookEntryService.updateLookbookEntry(id, lookbookEntryDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteLookbookEntry(@PathVariable Long id) {
        lookbookEntryService.deleteLookbookEntry(id);
    }
}
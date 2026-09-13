package com.fabricaepine.service;

import com.fabricaepine.dto.LookbookEntryDto;
import com.fabricaepine.model.LookbookEntry;
import com.fabricaepine.repository.LookbookEntryRepository;
import com.fabricaepine.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LookbookEntryService {

    private final LookbookEntryRepository lookbookEntryRepository;

    public LookbookEntryService(LookbookEntryRepository lookbookEntryRepository) {
        this.lookbookEntryRepository = lookbookEntryRepository;
    }

    public LookbookEntryDto createLookbookEntry(LookbookEntryDto lookbookEntryDto) {
        LookbookEntry lookbookEntry = new LookbookEntry();
        lookbookEntry.setTitle(lookbookEntryDto.getTitle());
        lookbookEntry.setContent(lookbookEntryDto.getContent());
        lookbookEntry.setImageUrl(lookbookEntryDto.getImageUrl());
        lookbookEntry.setPublicationDate(lookbookEntryDto.getPublicationDate());
        LookbookEntry savedEntry = lookbookEntryRepository.save(lookbookEntry);
        return mapToDto(savedEntry);
    }

    public List<LookbookEntryDto> getAllLookbookEntries() {
        return lookbookEntryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public LookbookEntryDto getLookbookEntryById(Long id) {
        LookbookEntry lookbookEntry = lookbookEntryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lookbook entry not found with id: " + id));
        return mapToDto(lookbookEntry);
    }

    public LookbookEntryDto updateLookbookEntry(Long id, LookbookEntryDto lookbookEntryDto) {
        LookbookEntry lookbookEntry = lookbookEntryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lookbook entry not found with id: " + id));
        lookbookEntry.setTitle(lookbookEntryDto.getTitle());
        lookbookEntry.setContent(lookbookEntryDto.getContent());
        lookbookEntry.setImageUrl(lookbookEntryDto.getImageUrl());
        lookbookEntry.setPublicationDate(lookbookEntryDto.getPublicationDate());
        LookbookEntry updatedEntry = lookbookEntryRepository.save(lookbookEntry);
        return mapToDto(updatedEntry);
    }

    public void deleteLookbookEntry(Long id) {
        if (!lookbookEntryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Lookbook entry not found with id: " + id);
        }
        lookbookEntryRepository.deleteById(id);
    }

    private LookbookEntryDto mapToDto(LookbookEntry lookbookEntry) {
        return LookbookEntryDto.builder()
                .id(lookbookEntry.getId())
                .title(lookbookEntry.getTitle())
                .content(lookbookEntry.getContent())
                .imageUrl(lookbookEntry.getImageUrl())
                .publicationDate(lookbookEntry.getPublicationDate())
                .build();
    }
}
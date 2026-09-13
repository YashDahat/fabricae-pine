package com.fabricaepine.repository;

import com.fabricaepine.model.LookbookEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LookbookEntryRepository extends JpaRepository<LookbookEntry, Long> {}

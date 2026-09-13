package com.fabricaepine.repository;

import com.fabricaepine.model.LookbookEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LookbookEntryRepository extends JpaRepository<LookbookEntry, UUID> {}

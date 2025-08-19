package com.drivezy.drivezyBackend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.drivezy.drivezyBackend.model.TestEntity;

public interface TestEntityRepository extends JpaRepository<TestEntity, Long> {
}


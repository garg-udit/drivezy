package com.drivezy.drivezyBackend.controller;


import com.drivezy.drivezyBackend.model.TestEntity;
import com.drivezy.drivezyBackend.repository.TestEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestEntityController {

    @Autowired
    private TestEntityRepository testEntityRepository;

    @PostMapping
    public TestEntity create(@RequestBody TestEntity entity) {
        return testEntityRepository.save(entity);
    }

    @GetMapping
    public List<TestEntity> list() {
        return testEntityRepository.findAll();
    }
}


package com.abutua.agenda_backend.controllers;

import com.abutua.agenda_backend.dtos.ProfissionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfissionalResponseDTO;
import com.abutua.agenda_backend.services.ProfissionalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("profissionais")
@CrossOrigin
public class ProfissionalController {

    @Autowired
    private ProfissionalService profissionalService;

    // Find with filter
    @GetMapping
    public ResponseEntity<Page<ProfissionalResponseDTO>> findAll(
        @RequestParam(name = "nome", defaultValue = "") String nome,
        @PageableDefault(page = 0, size = 10, sort = "nome") Pageable pageable
    ) {
        Page<ProfissionalResponseDTO> profissionais = profissionalService.findAll(nome, pageable);
        return ResponseEntity.ok(profissionais);
    }

    // Find by ID
    @GetMapping("{id}")
    public ResponseEntity<ProfissionalResponseDTO> findById(@PathVariable Long id) {
        ProfissionalResponseDTO profissionalDTO = profissionalService.findById(id);
        return ResponseEntity.ok(profissionalDTO);
    }

    // Create
    @PostMapping
    public ResponseEntity<ProfissionalResponseDTO> create(@RequestBody @Valid ProfissionalRequestDTO profissionalRequestDTO) {
        ProfissionalResponseDTO novoProfissional = profissionalService.create(profissionalRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProfissional);
    }

    // Update
    @PutMapping("{id}")
    public ResponseEntity<ProfissionalResponseDTO> update(@PathVariable Long id, @RequestBody @Valid ProfissionalRequestDTO profissionalRequestDTO) {
        ProfissionalResponseDTO profissionalAtualizado = profissionalService.update(id, profissionalRequestDTO);
        return ResponseEntity.ok(profissionalAtualizado);
    }

    // Delete
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        profissionalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
package com.abutua.agenda_backend.controllers;

import com.abutua.agenda_backend.dtos.ProfissionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfissionalResponseDTO;
import com.abutua.agenda_backend.services.ProfissionalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("profissionais")
@CrossOrigin
public class ProfissionalController {

    @Autowired
    private ProfissionalService profissionalService;

    @PostMapping
    public ResponseEntity<ProfissionalResponseDTO> create(@RequestBody @Valid ProfissionalRequestDTO profissionalRequestDTO) {
        ProfissionalResponseDTO novoProfissional = profissionalService.create(profissionalRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProfissional);
    }
}
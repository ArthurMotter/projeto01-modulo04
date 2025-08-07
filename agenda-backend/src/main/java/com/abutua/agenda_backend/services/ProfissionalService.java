package com.abutua.agenda_backend.services;

import com.abutua.agenda_backend.dtos.ProfissionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfissionalResponseDTO;
import com.abutua.agenda_backend.models.Area;
import com.abutua.agenda_backend.models.Profissional;
import com.abutua.agenda_backend.repositories.AreaRepository;
import com.abutua.agenda_backend.repositories.ProfissionalRepository;
import com.abutua.agenda_backend.services.mappers.ProfissionalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

@Service
public class ProfissionalService {

     @Autowired
    private ProfissionalRepository profissionalRepository;

    @Autowired
    private AreaRepository areaRepository;

    // Fetch (with filters)
    @Transactional(readOnly = true)
    public Page<ProfissionalResponseDTO> findAll(String nome, Pageable pageable) {
        Page<Profissional> pageProfissional;

        if (nome != null && !nome.isBlank()) {
            pageProfissional = profissionalRepository.findByNomeContainingIgnoreCase(nome, pageable);
        } else {
            pageProfissional = profissionalRepository.findAll(pageable);
        }
        
        return pageProfissional.map(ProfissionalMapper::toResponseDTO);
    }

    // Create
    @Transactional
    public ProfissionalResponseDTO create(ProfissionalRequestDTO profissionalRequestDTO) {
        
        Profissional profissional = ProfissionalMapper.toEntity(profissionalRequestDTO);
        
        List<Area> areas = areaRepository.findAllById(profissionalRequestDTO.getAreaIds());
        profissional.setAreas(Set.copyOf(areas));
        profissional = profissionalRepository.save(profissional);

        return ProfissionalMapper.toResponseDTO(profissional);
    }
}
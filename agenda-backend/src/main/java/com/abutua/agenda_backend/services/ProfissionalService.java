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

import java.util.List;
import java.util.Set;

@Service
public class ProfissionalService {

    @Autowired
    private ProfissionalRepository profissionalRepository;

    @Autowired
    private AreaRepository areaRepository;

    @Transactional
    public ProfissionalResponseDTO create(ProfissionalRequestDTO profissionalRequestDTO) {
        
        // Converte o DTO de requisição para uma entidade Profissional
        Profissional profissional = ProfissionalMapper.toEntity(profissionalRequestDTO);
        
        // Busca as entidades 'Area' com base nos IDs recebidos
        List<Area> areas = areaRepository.findAllById(profissionalRequestDTO.getAreaIds());
        
        // Associa o conjunto de áreas encontradas ao profissional
        profissional.setAreas(Set.copyOf(areas));

        // Salva o novo profissional no banco de dados
        profissional = profissionalRepository.save(profissional);

        // Converte a entidade salva para um DTO de resposta e o retorna
        return ProfissionalMapper.toResponseDTO(profissional);
    }
}
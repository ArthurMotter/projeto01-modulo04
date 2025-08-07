package com.abutua.agenda_backend.services;

import com.abutua.agenda_backend.dtos.AreaDTO;
import com.abutua.agenda_backend.models.Area;
import com.abutua.agenda_backend.repositories.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AreaService {

    @Autowired
    private AreaRepository areaRepository;

    // Area to AreaDTO Converter
    private AreaDTO toDTO(Area area) {
        AreaDTO areaDTO = new AreaDTO();
        areaDTO.setId(area.getId());
        areaDTO.setNome(area.getNome());
        return areaDTO;
    }

    @Transactional(readOnly = true) 
    public List<AreaDTO> findAll() {
        List<Area> areas = areaRepository.findAll();
        
        return areas.stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());
    }
}
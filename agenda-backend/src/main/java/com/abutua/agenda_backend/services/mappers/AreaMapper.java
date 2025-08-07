package com.abutua.agenda_backend.services.mappers;

import com.abutua.agenda_backend.dtos.AreaDTO;
import com.abutua.agenda_backend.models.Area;

public class AreaMapper {
    public static AreaDTO toDTO(Area area) {
        AreaDTO dto = new AreaDTO();
        dto.setId(area.getId());
        dto.setNome(area.getNome());
        return dto;
    }
}
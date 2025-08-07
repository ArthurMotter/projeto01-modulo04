package com.abutua.agenda_backend.services.mappers;

import com.abutua.agenda_backend.dtos.ProfissionalRequestDTO;
import com.abutua.agenda_backend.dtos.ProfissionalResponseDTO;
import com.abutua.agenda_backend.models.Profissional;

import java.util.stream.Collectors;

public class ProfissionalMapper {

    // Converte de DTO de requisição para Entidade
    public static Profissional toEntity(ProfissionalRequestDTO request) {
        return Profissional.builder()
                .nome(request.getNome())
                .telefone(request.getTelefone())
                .email(request.getEmail())
                .ativo(request.getAtivo())
                .build();
    }

    // Converte de Entidade para DTO de resposta
    public static ProfissionalResponseDTO toResponseDTO(Profissional profissional) {
        ProfissionalResponseDTO response = new ProfissionalResponseDTO();
        response.setId(profissional.getId());
        response.setNome(profissional.getNome());
        response.setTelefone(profissional.getTelefone());
        response.setEmail(profissional.getEmail());
        response.setAtivo(profissional.getAtivo());
        
        // Mapeia o Set<Area> para uma List<AreaDTO>
        if (profissional.getAreas() != null) {
            response.setAreas(
                profissional.getAreas().stream()
                    .map(AreaMapper::toDTO)
                    .collect(Collectors.toList())
            );
        }
        
        return response;
    }
}
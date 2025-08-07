package com.abutua.agenda_backend.dtos; 

import lombok.Data;
import java.util.List;

@Data
public class ProfissionalResponseDTO {
    private Long id;
    private String nome;
    private String telefone;
    private String email;
    private Boolean ativo;
    
    private List<AreaDTO> areas; 
}
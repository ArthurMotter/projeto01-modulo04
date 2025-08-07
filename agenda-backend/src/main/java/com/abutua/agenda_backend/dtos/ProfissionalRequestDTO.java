package com.abutua.agenda_backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Data
public class ProfissionalRequestDTO {

    @NotBlank(message = "O nome não pode ser vazio")
    @Size(min = 3, max = 150, message = "O nome deve ter entre 3 e 150 caracteres")
    private String nome;

    private String telefone;

    private String email;

    @NotNull(message = "O campo 'ativo' é obrigatório")
    private Boolean ativo;
    
    @NotNull(message = "A lista de áreas não pode ser nula")
    private List<Long> areaIds;
}
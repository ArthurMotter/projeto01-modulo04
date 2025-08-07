package com.abutua.agenda_backend.repositories;

import com.abutua.agenda_backend.models.Profissional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {

    /**
     * Busca profissionais cujo nome contém a string fornecida, ignorando maiúsculas e minúsculas.
     * A busca é paginada.
     * 
     * @param nome A parte do nome a ser pesquisada.
     * @param pageable Objeto contendo as informações de paginação (página, tamanho, ordenação).
     * @return Uma página (Page) de profissionais que correspondem ao critério.
     */
    Page<Profissional> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

}
package com.abutua.agenda_backend.repositories; 

import com.abutua.agenda_backend.models.Profissional; 
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfissionalRepository extends JpaRepository<Profissional, Long> {

}
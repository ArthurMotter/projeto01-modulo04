import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profissional } from '../models/profissional.model';

// Paginated interface
export interface Page<T> {
  content: T[];
  pageable: any;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Request DTO interface
export interface ProfissionalRequest {
  nome: string;
  telefone: string;
  email: string;
  ativo: boolean;
  areaIds: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {

  private readonly API_URL = 'http://localhost:8080/profissionais';

  constructor(private http: HttpClient) { }

  // get a page of professionals
  getProfissionais(
    page: number,
    size: number,
    nome: string
  ): Observable<Page<Profissional>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (nome) {
      params = params.set('nome', nome);
    }

    return this.http.get<Page<Profissional>>(this.API_URL, { params });
  }

  // Post
  create(data: ProfissionalRequest): Observable<Profissional> {
    return this.http.post<Profissional>(this.API_URL, data);
  }

  // Put
  update(id: number, data: ProfissionalRequest): Observable<Profissional> {
    return this.http.put<Profissional>(`${this.API_URL}/${id}`, data);
  }

  // Delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
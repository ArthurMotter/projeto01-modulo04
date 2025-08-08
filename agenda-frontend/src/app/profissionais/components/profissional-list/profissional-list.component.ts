import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../models/profissional.model';
import { Page, ProfissionalService } from '../../services/profissional.service';
import { CommonModule } from '@angular/common';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-profissional-list',
  standalone: false,
  templateUrl: './profissional-list.component.html',
  styleUrls: ['./profissional-list.component.css']
})
export class ProfissionalListComponent implements OnInit {

  page: Page<Profissional> | undefined;
  currentPage = 0;
  pageSize = 10;
  filterName = '';

  isLoading = true;

  constructor(private profissionalService: ProfissionalService) { }

  // Methods
  ngOnInit(): void {
    this.loadProfissionais();
  }

  loadProfissionais(): void {
    this.isLoading = true;
    this.profissionalService.getProfissionais(this.currentPage, this.pageSize, this.filterName)
      .subscribe({
        next: (data) => {
          this.page = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error fetching professionals:", err);
          this.isLoading = false;
        }
      });
  }

  // Handlers
  onFilter(): void {
    this.currentPage = 0;
    this.loadProfissionais();
  }


  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadProfissionais();
  }

  // Helpers
  getPageNumbers(): number[] {
    if (!this.page) {
      return [];
    }
    return Array.from({ length: this.page.totalPages }, (_, i) => i);
  }

  getAreaNames(areas: Area[]): string {
    if (!areas || areas.length === 0) {
      return 'N/A';
    }
    return areas.map(area => area.nome).join(', ');
  }

}
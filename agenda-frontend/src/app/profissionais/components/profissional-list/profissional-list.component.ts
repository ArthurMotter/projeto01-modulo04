import { Component, OnInit, ViewChild } from '@angular/core';
import { Profissional } from '../../models/profissional.model';
import { Page, ProfissionalService } from '../../services/profissional.service';
import { CommonModule } from '@angular/common';
import { Area } from '../../models/area.model';
import { ModalComponent } from '../../../layout/modal/modal.component';

@Component({
  selector: 'app-profissional-list',
  standalone: false,
  templateUrl: './profissional-list.component.html',
  styleUrls: ['./profissional-list.component.css']
})
export class ProfissionalListComponent implements OnInit {

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  profissionalToEdit?: Profissional;
  modalTitle = '';

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

  openModalForNew(): void {
    this.modalTitle = 'Novo Profissional';
    this.profissionalToEdit = undefined;
    this.modalComponent.open();
  }

  openModalForEdit(profissional: Profissional): void {
    this.modalTitle = 'Editar Profissional';
    this.profissionalToEdit = profissional;
    this.modalComponent.open();
  }

  // Handlers
  handleSave(): void {
    this.modalComponent.close();
    this.loadProfissionais();
  }

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
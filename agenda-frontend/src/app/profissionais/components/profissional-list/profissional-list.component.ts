import { Component, OnInit, ViewChild } from '@angular/core';
import { Profissional } from '../../models/profissional.model';
import { Page, ProfissionalService } from '../../services/profissional.service';
import { Area } from '../../models/area.model';
import { ModalComponent } from '../../../layout/modal/modal.component';
import { ToastService } from '../../../shared/toast.service';
import { ProfissionalFormComponent } from '../profissional-form/profissional-form.component';

@Component({
  selector: 'app-profissional-list',
  standalone: false,
  templateUrl: './profissional-list.component.html',
  styleUrls: ['./profissional-list.component.css']
})
export class ProfissionalListComponent implements OnInit {

  @ViewChild('formModal') formModal!: ModalComponent;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: ModalComponent;
  @ViewChild(ProfissionalFormComponent) formComponent!: ProfissionalFormComponent;

  expandedProfissionalId: number | null = null;
  profissionalToEdit?: Profissional;
  profissionalToDelete?: Profissional;
  modalTitle = '';

  page: Page<Profissional> | undefined;
  currentPage = 0;
  pageSize = 10;
  filterName = '';

  isLoading = true;

  constructor(
    private profissionalService: ProfissionalService,
    private toastService: ToastService
  ) { }

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

    this.formComponent.resetForm();

    this.formModal.open();
  }

  openModalForEdit(profissional: Profissional): void {
    this.modalTitle = 'Editar Profissional';
    this.profissionalToEdit = profissional;
    this.formModal.open();
  }

  openDeleteConfirmation(profissional: Profissional): void {
    this.profissionalToDelete = profissional;
    this.deleteConfirmationModal.open();
  }

  toggleDetails(id: number): void {
    if (this.expandedProfissionalId === id) {
      this.expandedProfissionalId = null;
    } else {
      this.expandedProfissionalId = id;
    }
  }

  // Handlers
  handleSave(): void {
    this.formModal.close();
    this.loadProfissionais();
  }

  confirmDelete(): void {
    if (this.profissionalToDelete) {
      this.profissionalService.delete(this.profissionalToDelete.id).subscribe({
        next: () => {
          this.toastService.showSuccess('Profissional excluído com sucesso!');
          this.loadProfissionais();
          this.deleteConfirmationModal.close();
        },
        error: (err) => {
          this.toastService.showError('Erro ao excluir profissional.');
          console.error("Error deleting professional:", err);
          this.deleteConfirmationModal.close();
        }
      });
    }
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
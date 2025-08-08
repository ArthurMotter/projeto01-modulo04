import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../models/profissional.model';
import { Page, ProfissionalService } from '../../services/profissional.service';
import { CommonModule } from '@angular/common';
import { Area } from '../../models/area.model';

@Component({
  selector: 'app-profissional-list',
  imports: [CommonModule],
  templateUrl: './profissional-list.component.html',
  styleUrls: ['./profissional-list.component.css']
})
export class ProfissionalListComponent implements OnInit {

  page: Page<Profissional> | undefined;
  isLoading = true;

  constructor(private profissionalService: ProfissionalService) { }

  // Methods
  ngOnInit(): void {
    this.loadProfissionais();
  }

  loadProfissionais(): void {
    this.isLoading = true;
    this.profissionalService.getProfissionais().subscribe({
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

  // Helpers
  getAreaNames(areas: Area[]): string {
    if (!areas || areas.length === 0) {
      return 'N/A';
    }
    return areas.map(area => area.nome).join(', ');
  }
}
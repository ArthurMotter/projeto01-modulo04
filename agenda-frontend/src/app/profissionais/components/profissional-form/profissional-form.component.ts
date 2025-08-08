import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Area } from '../../models/area.model';
import { Profissional } from '../../models/profissional.model';
import { AreaService } from '../../services/area.service';
import { ProfissionalService } from '../../services/profissional.service';

@Component({
  selector: 'app-profissional-form',
  standalone: false,
  templateUrl: './profissional-form.component.html',
  styleUrls: ['./profissional-form.component.css']
})
export class ProfissionalFormComponent implements OnInit, OnChanges {
  @Input() profissional?: Profissional;
  @Output() onSave = new EventEmitter<void>();

  form: FormGroup;
  areas$: Observable<Area[]>;

  constructor(
    private fb: FormBuilder,
    private profissionalService: ProfissionalService,
    private areaService: AreaService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telefone: [''],
      ativo: [true, Validators.required],
      areaIds: [[]]
    });
    this.areas$ = this.areaService.getAreas();
  }

  // Methods
  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profissional'] && this.profissional) {
      this.form.patchValue({
        ...this.profissional,
        areaIds: this.profissional.areas.map(a => a.id)
      });
    } else if (!this.profissional) {
      this.form.reset({ ativo: true, areaIds: [] });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;
    const request = this.profissional ?
      this.profissionalService.update(this.profissional.id, formData) :
      this.profissionalService.create(formData);

    request.subscribe({
      next: () => this.onSave.emit(),
      error: (err) => console.error("Error saving professional", err)
    });
  }
}
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Area } from '../../models/area.model';
import { Profissional } from '../../models/profissional.model';
import { AreaService } from '../../services/area.service';
import { ProfissionalService } from '../../services/profissional.service';
import { ToastService } from '../../../shared/toast.service';

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
    private areaService: AreaService,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.email]],
      telefone: [''],
      ativo: [true, Validators.required],
      areaIds: [[], [Validators.required]]
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
    }
  }

  public resetForm(): void {
    this.form.reset({
      nome: '',
      email: '',
      telefone: '',
      ativo: true,
      areaIds: []
    });
  }

  // Handlers
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
      next: () => {
        const message = this.profissional ? 'Profissional atualizado com sucesso!' : 'Profissional criado com sucesso!';
        this.toastService.showSuccess(message);
        this.onSave.emit();
      },
      error: (err) => {
        this.toastService.showError('Erro ao salvar profissional.');
        console.error("Error saving professional", err);
      }
    });
  }

  // Helpers
  get nome(): AbstractControl | null { return this.form.get('nome'); }
  get email(): AbstractControl | null { return this.form.get('email'); }
  get areaIds(): AbstractControl | null { return this.form.get('areaIds'); }
}
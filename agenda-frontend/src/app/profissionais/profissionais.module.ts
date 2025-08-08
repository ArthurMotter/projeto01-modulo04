import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { ProfissionaisRoutingModule } from './profissionais-routing.module';
import { ProfissionalListComponent } from './components/profissional-list/profissional-list.component';
import { ProfissionalFormComponent } from './components/profissional-form/profissional-form.component';
import { ModalComponent } from '../layout/modal/modal.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    ProfissionalListComponent,
    ProfissionalFormComponent
  ],
  imports: [
    CommonModule,
    ProfissionaisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalComponent ,
    NgxMaskDirective,
    NgxMaskPipe       
  ]
})
export class ProfissionaisModule { }
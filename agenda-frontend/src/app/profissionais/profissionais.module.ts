import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfissionaisRoutingModule } from './profissionais-routing.module';
import { ProfissionaisComponent } from './profissionais.component';
import { FormsModule } from '@angular/forms';
import { ProfissionalListComponent } from './components/profissional-list/profissional-list.component';
import { ProfissionalFormComponent } from './components/profissional-form/profissional-form.component';


@NgModule({
  declarations: [
    ProfissionaisComponent,
    ProfissionalListComponent,
    ProfissionalFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProfissionaisRoutingModule
  ]
})
export class ProfissionaisModule { }

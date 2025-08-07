import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfissionaisRoutingModule } from './profissionais-routing.module';
import { ProfissionaisComponent } from './profissionais.component';


@NgModule({
  declarations: [
    ProfissionaisComponent
  ],
  imports: [
    CommonModule,
    ProfissionaisRoutingModule
  ]
})
export class ProfissionaisModule { }

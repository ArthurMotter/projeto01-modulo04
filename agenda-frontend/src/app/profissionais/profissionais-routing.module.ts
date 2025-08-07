import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfissionalListComponent } from './components/profissional-list/profissional-list.component';

const routes: Routes = [
  { path: '', component: ProfissionalListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionaisRoutingModule { }
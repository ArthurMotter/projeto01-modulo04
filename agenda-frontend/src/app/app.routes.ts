import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'profissionais',
        loadChildren: () => import('./profissionais/profissionais.module').then(m => m.ProfissionaisModule)
    }
];
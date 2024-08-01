import { Routes } from '@angular/router';
import { DetallesComponent } from '../components/detalles/detalles.component';
import { DirectorioComponent } from '../components/directorio/directorio.component';

export const routes: Routes = [
  {
    path: 'home',
    component: DirectorioComponent,
  },
  {
    path: 'detalles',
    component: DetallesComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

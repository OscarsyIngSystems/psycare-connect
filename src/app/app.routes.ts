import { Routes } from '@angular/router';
import { DetallesComponent } from '../components/detalles/detalles.component';
import { DirectorioComponent } from '../components/directorio/directorio.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';

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
    path: 'admin',
    component: AdministradorComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

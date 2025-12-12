import { Router, Routes } from '@angular/router';
import { DetallesComponent } from '../components/detalles/detalles.component';
import { DirectorioComponent } from '../components/directorio/directorio.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';
import { inject } from '@angular/core';


// Guard definido directamente en el mismo archivo
const authGuard = () => {
  const router = inject(Router);
  const accesoPermitido = sessionStorage.getItem('accesoRedireccion') === 'true';

  if (!accesoPermitido) {
    router.navigate(['/home']);
    return false;
  }

  sessionStorage.removeItem('accesoRedireccion');
  return true;
};



export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',  // Redirige la raíz a home
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DirectorioComponent,

  },
  {
    path: 'detalles',
    component: DetallesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdministradorComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

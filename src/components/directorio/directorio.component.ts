import { Component } from '@angular/core';
import { registros } from '../../assets/directorio.json';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-directorio',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './directorio.component.html',
  styleUrl: './directorio.component.scss',
})
export class DirectorioComponent {
  institutos;
  constructor() {
    this.institutos = registros;
  }

  verDetalle(institutoSeleccionado: any) {
    console.log(institutoSeleccionado, 'Seleciona instituto');
    localStorage.setItem('instSelect', JSON.stringify(institutoSeleccionado));
  }
}

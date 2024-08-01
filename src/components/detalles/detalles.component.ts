import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss',
})
export class DetallesComponent {
  data;
  constructor() {
    this.data = JSON.parse(localStorage.getItem('instSelect')!);
    console.log(this.data, 'detalles del instituto');
  }
}

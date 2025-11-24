import { Component, OnInit } from '@angular/core';
import { registros } from '../../assets/directorio.json';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-directorio',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './directorio.component.html',
  styleUrl: './directorio.component.scss',
})
export class DirectorioComponent implements OnInit {
  institutos;

  scroll: any;
  position: any;
  constructor() {
    this.institutos = registros;

  }


  ngOnInit(): void {

    this.restoreScrollPosition();
  }

  restoreScrollPosition() {
    const posStr = localStorage.getItem('scrollPos');

    if (posStr) {
      this.position = JSON.parse(posStr);
      console.log(this.position, 'POSITION');

      // Usar setTimeout para asegurar que el DOM esté listo
      setTimeout(() => {
        window.scrollTo({
          top: this.position.y,
          left: this.position.x,
          behavior: 'smooth' // 'smooth' para animación suave
        });
        console.log('Scroll position restored');
      }, 100);
    }

    localStorage.removeItem('scrollPos');
  }

  verDetalle(institutoSeleccionado: any) {
    this.scroll = this.getScrollPosition();

    localStorage.setItem('scrollPos', JSON.stringify(this.scroll));
    console.log(institutoSeleccionado, 'Seleciona instituto');
    localStorage.setItem('instSelect', JSON.stringify(institutoSeleccionado));
  }


  getScrollPosition() {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
}




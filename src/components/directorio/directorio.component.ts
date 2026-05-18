import { Component, OnInit } from '@angular/core';

import directorioJson from '../../assets/directorio.json';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LordAlertService } from '../lord-alert/service/lord-alert.service';

@Component({
  selector: 'app-directorio',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './directorio.component.html',
  styleUrl: './directorio.component.scss',
})
export class DirectorioComponent implements OnInit {
  institutos;
  registros: any = [];
  scroll: any;
  position: any;



  constructor(private router: Router, private lordAlert: LordAlertService) {
    this.registros = directorioJson.registros;
    this.institutos = this.registros;

  }


  ngOnInit(): void {

    this.restoreScrollPosition();
  }

  restoreScrollPosition() {
    const posStr = localStorage.getItem('scrollPos');

    if (posStr) {
      this.position = JSON.parse(posStr);
      console.log(this.position, 'POSITION');


      setTimeout(() => {
        window.scrollTo({
          top: this.position.y,
          left: this.position.x,
          behavior: 'smooth'
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

    sessionStorage.setItem('accesoRedireccion', 'true');
    this.router.navigate(['/detalles']);

  }


  getScrollPosition() {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
}




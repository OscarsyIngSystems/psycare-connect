import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TituloComponent } from '../components/titulo/titulo.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TituloComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'directorio';
}

// components/spinner/spinner.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerLordService } from '../../services/spinner-lord.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  // Inyectar el servicio
  private spinnerService = inject(SpinnerLordService);

  // Obtener el estado del spinner
  isLoading = this.spinnerService.isLoading;
}

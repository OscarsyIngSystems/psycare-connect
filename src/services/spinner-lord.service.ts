// services/spinner-lord.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerLordService {
  // Signal para controlar la visibilidad del spinner
  private _isLoading = signal<boolean>(false);

  // Signal pública para el componente
  public isLoading = this._isLoading.asReadonly();

  // Contador de peticiones activas
  private requestCount = 0;

  constructor() { }

  /**
   * Mostrar el spinner
   */
  show(): void {
    this.requestCount++;
    this._isLoading.set(true);
  }

  /**
   * Ocultar el spinner
   */
  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this._isLoading.set(false);
    }
  }

  /**
   * Forzar el cierre del spinner
   */
  forceHide(): void {
    this.requestCount = 0;
    this._isLoading.set(false);
  }

  /**
   * Resetear el estado del spinner
   */
  reset(): void {
    this.requestCount = 0;
    this._isLoading.set(false);
  }
}

import { Injectable } from '@angular/core';
import { useSweetalert } from '../lordAlert'; // Ajusta la ruta

/**
 * se usa   "sweetalert2": "^11.0.0",
 * 
 * Ejemplo de usar en componente
 *       this.lordAlert.showModal(
                  'Requerimiento creado !',
                  `Con folio ${res.folio} y folio del cliente ${this.clientNew.folio}`,
                  'success',
                  () => {
                    // Redireccionar a la tabla de requerimientos
                    this.router.navigate(['/seg-req']);
                  },
                );
 */

@Injectable({
  providedIn: 'root',
})
export class LordAlertService {
  constructor() {}

  private sweetAlert = useSweetalert;

  // Método para mostrar Toast
  showToast(title: string, icon: 'success' | 'error' | 'warning' | 'info') {
    this.sweetAlert(title, '', icon, 'lordToast').LordAlert();
  }

  // Método para mostrar Modal
  showModal(
    title: string,
    text: string,
    icon: 'success' | 'error' | 'warning' | 'info',
    onConfirm?: () => void,
  ) {
    this.sweetAlert(title, text, icon, 'lordModal', onConfirm).LordAlert();
  }
}

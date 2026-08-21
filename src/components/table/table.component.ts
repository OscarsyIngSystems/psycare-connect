import { Component, signal, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Institucion } from '../../interfaces/institucion';
import { CommonModule } from '@angular/common';
import { LordAlertService } from '../lord-alert/service/lord-alert.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  // Signal para el instituto seleccionado
  institutoSelectado = signal<Institucion | null>(null);

  // Datos de entrada desde el componente padre
  @Input() instituciones: Institucion[] = [];

  // Eventos para comunicar con el padre
  @Output() editar = new EventEmitter<Institucion>();
  @Output() eliminar = new EventEmitter<Institucion>();
  @Output() guardar = new EventEmitter<any>();

  constructor(private lordAlert: LordAlertService) { }

  /**
   * Editar instituto - abre el modal
   */
  editarInstitucion(institucion: Institucion): void {
    console.log('Editar:', institucion);
    this.institutoSelectado.set(institucion);
    // El modal se abre con data-bs-toggle
  }

  /**
   * Eliminar instituto con confirmación
   */
  eliminarInstituto(institucion: Institucion): void {
    this.lordAlert.showModal(
      '¿Eliminar instituto?',
      `¿Estás seguro de que deseas eliminar "${institucion.nombre}"? Esta acción no se puede deshacer.`,
      'warning',
      () => {
        // Emitir el evento de eliminación al padre
        this.eliminar.emit(institucion);
      }
    );
  }

  /**
   * Cerrar el modal
   */
  closeModal(): void {
    this.institutoSelectado.set(null);
    // Cerrar el modal de Bootstrap
    const modalElement = document.getElementById('editCreateModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  /**
   * Manejar el cierre del modal desde el formulario
   */
  onFormCloseModal(): void {
    this.closeModal();
  }

  /**
   * Manejar el guardado desde el formulario
   */
  onFormSave(event: any): void {
    this.guardar.emit(event);
    this.closeModal();
  }

  /**
   * Obtener la primera dirección formateada
   */
  getPrimeraDireccion(institucion: Institucion): string {
    if (institucion.direcciones && institucion.direcciones.length > 0) {
      return institucion.direcciones[0].direccion;
    }
    return 'Sin dirección';
  }

  /**
   * Obtener el número de direcciones
   */
  getNumeroDirecciones(institucion: Institucion): number {
    return institucion.direcciones?.length || 0;
  }
}

// table.component.ts
import { Component, signal, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class TableComponent implements OnChanges {
  @Input() instituciones: Institucion[] = [];
  @Input() error: string = ''; // Recibir error del padre
  @Input() loading: boolean = true; // Recibir estado de carga del padre
  @Output() editar = new EventEmitter<Institucion>();
  @Output() eliminar = new EventEmitter<Institucion>();
  @Output() guardar = new EventEmitter<any>();
  @Output() reintentar = new EventEmitter<void>(); // Evento para reintentar

  institutoSelectado = signal<Institucion | null>(null);

  constructor(private lordAlert: LordAlertService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['instituciones']) {
      console.log('Instituciones actualizadas:', this.instituciones);
    }
    if (changes['error']) {
      console.log('Error recibido:', this.error);
    }
    if (changes['loading']) {
      console.log('Loading:', this.loading);
    }
  }

  /**
   * Editar instituto - abre el modal
   */
  editarInstitucion(institucion: Institucion): void {
    console.log('Editar:', institucion);
    this.institutoSelectado.set(institucion);
    this.editar.emit(institucion);
  }

  /**
   * Eliminar instituto con confirmación
   */
  eliminarInstituto(institucion: Institucion): void {
    this.eliminar.emit(institucion);
  }

  /**
   * Cerrar el modal
   */
  closeModal(): void {
    // ✅ Resetear el instituto seleccionado
    this.institutoSelectado.set(null);

    // ✅ Cerrar el modal de Bootstrap
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

  /**
   * Resetear el formulario para nuevo instituto
   */
  resetForm(): void {
    this.institutoSelectado.set(null);
    const modalElement = document.getElementById('editCreateModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  /**
   * Manejar el reintento
   */
  onReintentar(): void {
    this.reintentar.emit();
  }

  /**
   * Verificar si hay error - RETORNA BOOLEAN EXPLÍCITO
   */
  hasError(): boolean {
    return !!(this.error && this.error.length > 0);
  }

  /**
   * Verificar si hay datos
   */
  hasData(): boolean {
    return this.instituciones && this.instituciones.length > 0;
  }

  /**
   * Verificar si está cargando
   */
  isLoading(): boolean {
    return this.loading === true;
  }
}

// administrador.component.ts
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { InstitutoService } from '../../services/instituto.service';
import { Institucion } from '../../interfaces/institucion';
import { LordAlertService } from '../lord-alert/service/lord-alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit {
  institutos: Institucion[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private institutoService: InstitutoService,
    private lordAlert: LordAlertService
  ) { }

  ngOnInit(): void {
    this.cargarInstitutos();
  }

  /**
   * Carga todos los institutos desde la API
   */
  cargarInstitutos(): void {
    this.loading = true;
    this.error = '';

    this.institutoService.getInstitutos().subscribe({
      next: (data: Institucion[]) => {
        this.institutos = data.map(instituto => ({
          ...instituto,
          activo: instituto.activo !== undefined ? instituto.activo : true
        }));
        this.loading = false;
        this.error = '';
        console.log('Institutos cargados:', this.institutos);
      },
      error: (err: any) => {
        console.error('Error al cargar institutos:', err);
        this.loading = false;

        // Manejar diferentes códigos de error
        if (err.status === 500) {
          this.error = 'Error interno del servidor (500). Por favor, intenta de nuevo más tarde.';
        } else if (err.status === 404) {
          this.error = 'No se encontró el recurso. Verifica la URL de la API.';
        } else if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
        } else if (err.status === 401) {
          this.error = 'No autorizado. Verifica tus credenciales.';
        } else if (err.status === 403) {
          this.error = 'Acceso denegado. No tienes permisos para ver estos datos.';
        } else {
          this.error = `Error ${err.status}: ${err.message || 'Error al cargar los institutos'}`;
        }

        this.lordAlert.showToast('Error al cargar institutos', 'error');
      }
    });
  }

  /**
   * Reintentar cargar los institutos
   */
  handleReintentar(): void {
    this.lordAlert.showToast('Reintentando carga...', 'info');
    this.cargarInstitutos();
  }

  /**
   * Resetear el formulario para nuevo instituto
   */
  resetForm(): void {
    console.log('Resetear formulario para nuevo instituto');
  }

  /**
   * Maneja la creación o actualización de un instituto
   */
  handleSave(event: any): void {
    const { data, activo } = event;

    if (data.id) {
      // Actualizar instituto existente
      this.institutoService.updateInstituto(data.id, data).subscribe({
        next: (institutoActualizado: Institucion) => {
          const index = this.institutos.findIndex(i => i.id === data.id);
          if (index !== -1) {
            this.institutos[index] = {
              ...institutoActualizado,
              activo: activo
            };
          }
          this.lordAlert.showToast('Instituto actualizado exitosamente', 'success');
        },
        error: (err: any) => {
          console.error('Error al actualizar instituto:', err);
          this.lordAlert.showToast('Error al actualizar el instituto', 'error');
        }
      });
    } else {
      // Crear nuevo instituto
      this.institutoService.createInstituto(data).subscribe({
        next: (nuevoInstituto: Institucion) => {
          const institutoConEstado = {
            ...nuevoInstituto,
            activo: activo
          };
          this.institutos.push(institutoConEstado);
          this.lordAlert.showToast('Instituto creado exitosamente', 'success');
        },
        error: (err: any) => {
          console.error('Error al crear instituto:', err);
          this.lordAlert.showToast('Error al crear el instituto', 'error');
        }
      });
    }
  }

  /**
   * Maneja la eliminación de un instituto
   */
  handleEliminar(instituto: Institucion): void {
    this.lordAlert.showModal(
      '¿Eliminar instituto?',
      `¿Estás seguro de que deseas eliminar "${instituto.nombre}"? Esta acción no se puede deshacer.`,
      'warning',
      () => {
        this.institutoService.deleteInstituto(instituto.id).subscribe({
          next: () => {
            this.institutos = this.institutos.filter(i => i.id !== instituto.id);
            this.lordAlert.showModal(
              '¡Eliminado!',
              `El instituto "${instituto.nombre}" ha sido eliminado exitosamente`,
              'success'
            );
          },
          error: (err: any) => {
            console.error('Error al eliminar instituto:', err);
            this.lordAlert.showToast('Error al eliminar el instituto', 'error');
          }
        });
      }
    );
  }

  /**
   * Maneja la edición de un instituto
   */
  handleEditar(instituto: Institucion): void {
    console.log('Editar instituto:', instituto);
  }
}

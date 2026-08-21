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
        this.error = 'Error al cargar los institutos';
        this.lordAlert.showToast('Error al cargar institutos', 'error');
      }
    });
  }

  handleReintentar(): void {
    this.lordAlert.showToast('Reintentando carga...', 'info');
    this.cargarInstitutos();
  }

  resetForm(): void {
    console.log('Resetear formulario para nuevo instituto');
  }

  /**
   * ✅ NUEVO: Convierte las direcciones al formato correcto
   */
  private formatearDirecciones(direcciones: any[]): any[] {
    if (!direcciones || direcciones.length === 0) {
      return [];
    }

    // Si ya son objetos con propiedad "direccion", devolverlos tal cual
    if (typeof direcciones[0] === 'object' && direcciones[0].direccion) {
      return direcciones;
    }

    // Si son strings, convertirlos a objetos
    return direcciones.map(dir => ({
      direccion: dir
    }));
  }

  /**
   * Maneja la creación o actualización de un instituto
   */
  handleSave(event: any): void {
    const { data, activo } = event;

    // ✅ Formatear las direcciones antes de enviar
    const dataFormateada = {
      ...data,
      direcciones: this.formatearDirecciones(data.direcciones || [])
    };

    console.log('📤 Datos a enviar:', dataFormateada);

    if (data.id) {
      // Actualizar instituto existente
      this.institutoService.updateInstituto(data.id, dataFormateada).subscribe({
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
          console.error('❌ Error al actualizar instituto:', err);
          console.error('📄 Detalles del error:', err.error);
          this.lordAlert.showToast('Error al actualizar el instituto', 'error');
        }
      });
    } else {
      // Crear nuevo instituto
      this.institutoService.createInstituto(dataFormateada).subscribe({
        next: (nuevoInstituto: Institucion) => {
          const institutoConEstado = {
            ...nuevoInstituto,
            activo: activo
          };
          this.institutos.push(institutoConEstado);
          this.lordAlert.showToast('Instituto creado exitosamente', 'success');
          this.cargarInstitutos(); // Recargar para actualizar la lista
        },
        error: (err: any) => {
          console.error('❌ Error al crear instituto:', err);
          console.error('📄 Detalles del error:', err.error);
          this.lordAlert.showToast('Error al crear el instituto', 'error');
        }
      });
    }
  }

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

  handleEditar(instituto: Institucion): void {
    console.log('Editar instituto:', instituto);
  }
}

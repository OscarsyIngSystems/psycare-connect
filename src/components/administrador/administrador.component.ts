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
        console.log('✅ Institutos cargados:', this.institutos.length);
      },
      error: (err: any) => {
        console.error('❌ Error al cargar institutos:', err);
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
   * ✅ Formatea las direcciones para enviar al backend
   * Convierte cualquier formato a { direccion: "texto" }
   */
  private formatearDirecciones(direcciones: any[]): any[] {
    if (!direcciones || direcciones.length === 0) {
      return [];
    }

    return direcciones
      .filter(dir => {
        if (!dir) return false;
        // Si es string, verificar que no esté vacía
        if (typeof dir === 'string') return dir.trim() !== '';
        // Si es objeto, verificar que tenga direccion
        if (typeof dir === 'object') {
          const value = dir.direccion || dir.direccion || '';
          return value && value.trim() !== '';
        }
        return false;
      })
      .map((dir: any) => {
        // Si es string, convertir a objeto
        if (typeof dir === 'string') {
          return { direccion: dir.trim() };
        }
        // Si es objeto, extraer la dirección y eliminar ID
        if (typeof dir === 'object') {
          const direccionValue = dir.direccion || dir.direccion || '';
          return { direccion: direccionValue.trim() };
        }
        return { direccion: '' };
      })
      .filter(dir => dir.direccion && dir.direccion !== '');
  }

  /**
   * ✅ Maneja el guardado (crear o actualizar)
   */
  handleSave(event: any): void {
    const { data, activo } = event;

    console.log('🔍 Datos recibidos:', data);

    // ✅ Formatear direcciones
    const direccionesFormateadas = this.formatearDirecciones(data.direcciones || []);

    // ✅ Construir objeto a enviar (sin ID)
    const dataFormateada = {
      nombre: data.nombre || '',
      descripcion: data.descripcion || '',
      imagen: data.imagen || '',
      contacto: data.contacto || '',
      correo: data.correo || null,
      proceso: data.proceso || '',
      iframe: data.iframe || '',
      direcciones: direccionesFormateadas
    };

    console.log('📤 Enviando:', JSON.stringify(dataFormateada, null, 2));

    if (data.id) {
      // ✅ ACTUALIZAR
      this.institutoService.updateInstituto(data.id, dataFormateada).subscribe({
        next: (institutoActualizado: Institucion) => {
          const index = this.institutos.findIndex(i => i.id === data.id);
          if (index !== -1) {
            this.institutos[index] = {
              ...institutoActualizado,
              activo: activo
            };
          }
          this.lordAlert.showToast('✅ Instituto actualizado', 'success');
          this.cargarInstitutos();
        },
        error: (err: any) => {
          console.error('❌ Error al actualizar:', err);
          this.lordAlert.showToast('Error al actualizar', 'error');
        }
      });
    } else {
      // ✅ CREAR
      this.institutoService.createInstituto(dataFormateada).subscribe({
        next: (nuevoInstituto: Institucion) => {
          this.institutos.push({ ...nuevoInstituto, activo: activo });
          this.lordAlert.showToast('✅ Instituto creado', 'success');
          this.cargarInstitutos();
        },
        error: (err: any) => {
          console.error('❌ Error al crear:', err);
          this.lordAlert.showToast('Error al crear', 'error');
        }
      });
    }
  }

  handleEliminar(instituto: Institucion): void {
    this.lordAlert.showModal(
      '¿Eliminar instituto?',
      `¿Estás seguro de eliminar "${instituto.nombre}"?`,
      'warning',
      () => {
        this.institutoService.deleteInstituto(instituto.id).subscribe({
          next: () => {
            this.institutos = this.institutos.filter(i => i.id !== instituto.id);
            this.lordAlert.showModal('¡Eliminado!', 'El instituto fue eliminado', 'success');
          },
          error: (err: any) => {
            console.error('Error al eliminar:', err);
            this.lordAlert.showToast('Error al eliminar', 'error');
          }
        });
      }
    );
  }

  handleEditar(instituto: Institucion): void {
    console.log('Editar:', instituto);
  }
}

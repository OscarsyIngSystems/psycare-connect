// directorio.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LordAlertService } from '../lord-alert/service/lord-alert.service';
import { LordStorageService } from '../../services/lord-storage/lord-storage.service';
import { InstitutoService } from '../../services/instituto.service';
import { Institucion } from '../../interfaces/institucion';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

@Component({
  selector: 'app-directorio',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    EmptyStateComponent
  ],
  templateUrl: './directorio.component.html',
  styleUrl: './directorio.component.scss',
})
export class DirectorioComponent implements OnInit {
  institutos: Institucion[] = [];
  institutosFiltrados: Institucion[] = [];
  loading: boolean = false;
  error: string = '';
  scroll: any;
  position: any;

  constructor(
    private router: Router,
    private lordAlert: LordAlertService,
    private institutoService: InstitutoService,
    private storageService: LordStorageService
  ) { }

  ngOnInit(): void {
    this.loadInstitutos();
    this.restoreScrollPosition();
  }

  /**
   * Carga los institutos desde la API
   */
  loadInstitutos(): void {
    this.loading = true;
    this.error = '';

    this.institutoService.getInstitutos().subscribe({
      next: (data: Institucion[]) => {
        // Ordenar los datos por ID antes de asignarlos
        const dataOrdenada = data.sort((a, b) => a.id - b.id);
        
        // Asignar activo: true por defecto para todos los institutos
        this.institutos = dataOrdenada.map(instituto => ({
          ...instituto,
          activo: true // Todos activos por defecto
        }));
        this.filtrarInstitutosActivos();
        this.loading = false;
        console.log('Institutos cargados desde API y ordenados por ID:', this.institutos);
      },
      error: (err: any) => {
        console.error('Error al cargar institutos:', err);
        this.error = 'Error al cargar los institutos. Por favor, intenta de nuevo.';
        this.loading = false;
        this.lordAlert.showToast('Error al cargar institutos', 'error');
      }
    });
  }

  /**
   * Filtrar solo los institutos activos para mostrar en el directorio
   */
  filtrarInstitutosActivos(): void {
    this.institutosFiltrados = this.institutos.filter(inst => inst.activo !== false);
  }

  /**
   * Restaura la posición del scroll guardada en localStorage
   */
  restoreScrollPosition(): void {
    const posStr = localStorage.getItem('scrollPos');
    if (posStr) {
      this.position = JSON.parse(posStr);
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

  /**
   * Navega al detalle del instituto seleccionado
   */
  verDetalle(institutoSeleccionado: Institucion): void {
    this.scroll = this.getScrollPosition();
    localStorage.setItem('scrollPos', JSON.stringify(this.scroll));

    // Guardar el instituto completo incluyendo el iframe
    this.storageService.setItemEncrypt('instSelect', institutoSeleccionado);
    console.log(institutoSeleccionado, 'Selecciona instituto');

    sessionStorage.setItem('accesoRedireccion', 'true');
    this.router.navigate(['/detalles']);
  }

  /**
   * Obtiene la posición actual del scroll
   */
  getScrollPosition(): { x: number; y: number } {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }

  /**
   * Recarga los institutos desde la API
   */
  recargarInstitutos(): void {
    this.loadInstitutos();
    this.lordAlert.showToast('Recargando institutos...', 'info');
  }

  /**
   * Manejar el reintento desde el EmptyState
   */
  handleRetry(): void {
    this.loadInstitutos();
    this.lordAlert.showToast('Reintentando carga...', 'info');
  }

  /**
   * Manejar el guardado desde el formulario
   */
  handleSave(event: any): void {
    const { data, activo } = event;

    if (data.id) {
      // Actualizar instituto existente
      this.institutoService.updateInstituto(data.id, data).subscribe({
        next: (institutoActualizado: Institucion) => {
          const index = this.institutos.findIndex(i => i.id === data.id);
          if (index !== -1) {
            // Mantener el estado activo del frontend
            this.institutos[index] = {
              ...institutoActualizado,
              activo: activo
            };
          }
          // Re-ordenar después de actualizar
          this.institutos.sort((a, b) => a.id - b.id);
          this.filtrarInstitutosActivos();
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
          // Re-ordenar después de agregar
          this.institutos.sort((a, b) => a.id - b.id);
          this.filtrarInstitutosActivos();
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
   * Eliminar instituto con confirmación
   */
  eliminarInstituto(id: number, nombre: string): void {
    this.lordAlert.showModal(
      '¿Eliminar instituto?',
      `¿Estás seguro de que deseas eliminar "${nombre}"? Esta acción no se puede deshacer.`,
      'warning',
      () => {
        this.institutoService.deleteInstituto(id).subscribe({
          next: () => {
            this.institutos = this.institutos.filter(i => i.id !== id);
            // Re-ordenar después de eliminar
            this.institutos.sort((a, b) => a.id - b.id);
            this.filtrarInstitutosActivos();
            this.lordAlert.showModal(
              '¡Eliminado!',
              `El instituto "${nombre}" ha sido eliminado exitosamente`,
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
}

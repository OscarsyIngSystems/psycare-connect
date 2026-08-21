// detalles.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Institucion } from '../../interfaces/institucion';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LordStorageService } from '../../services/lord-storage/lord-storage.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss',
})
export class DetallesComponent implements OnInit {
  data: Institucion | null = null;
  loading: boolean = true;
  error: string = '';
  iframeUrl: SafeResourceUrl | string = '';
  imageUrl: string = '';

  // Arrays procesados para el template
  direccionesList: string[] = [];
  contactosList: string[] = [];
  procesoList: string[] = [];

  constructor(
    private storageService: LordStorageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cargarDetalles();
  }

  cargarDetalles(): void {
    try {
      const instituto = this.storageService.getItemEncrypt('instSelect');

      if (instituto) {
        this.data = instituto;
        this.procesarDatos();
        this.procesarMultimedia();
        console.log('Detalles del instituto:', this.data);
      } else {
        const fallbackData = localStorage.getItem('instSelect');
        if (fallbackData) {
          this.data = JSON.parse(fallbackData);
          this.procesarDatos();
          this.procesarMultimedia();
          console.log('Detalles del instituto (fallback):', this.data);
        } else {
          this.error = 'No se encontró el instituto seleccionado';
        }
      }

      this.loading = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Error al cargar detalles:', error);
      this.error = 'Error al cargar los detalles del instituto';
      this.loading = false;
    }
  }

  /**
   * Procesa el contenido multimedia (iframe o imagen)
   */
  procesarMultimedia(): void {
    if (!this.data?.iframe) {
      this.iframeUrl = '';
      this.imageUrl = '';
      return;
    }

    let contenido = this.data.iframe;

    // Verificar si es una imagen (contiene <img>)
    if (contenido.includes('<img')) {
      // Extraer src de la imagen
      const srcMatch = contenido.match(/src=['"]([^'"]+)['"]/);
      if (srcMatch && srcMatch[1]) {
        this.imageUrl = srcMatch[1];
        this.iframeUrl = '';
      }
      return;
    }

    // Verificar si es un iframe (contiene <iframe>)
    if (contenido.includes('<iframe')) {
      // Extraer src del iframe
      let srcMatch = contenido.match(/src="([^"]+)"/);
      if (!srcMatch) {
        srcMatch = contenido.match(/src='([^']+)'/);
      }
      if (srcMatch && srcMatch[1]) {
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(srcMatch[1]);
        this.imageUrl = '';
      }
      return;
    }

    // Si es una URL directa de imagen
    if (contenido.match(/\.(jpg|jpeg|png|gif|webp)/i)) {
      this.imageUrl = contenido;
      this.iframeUrl = '';
      return;
    }

    // Si es una URL de Google Maps
    if (contenido.includes('google.com/maps/embed')) {
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(contenido);
      this.imageUrl = '';
    }
  }

  /**
   * Procesa los datos para el template
   */
  procesarDatos(): void {
    if (!this.data) return;

    // Procesar direcciones
    if (this.data.direcciones && this.data.direcciones.length > 0) {
      this.direccionesList = this.data.direcciones.map(d => d.direccion);
    }

    // Procesar contactos
    if (this.data.contacto) {
      this.contactosList = this.data.contacto.split(',').map(c => c.trim()).filter(c => c);
    }

    // Procesar proceso (separar por *)
    if (this.data.proceso) {
      this.procesoList = this.data.proceso
        .split('*')
        .map(p => p.trim())
        .filter(p => p);
    }
  }

  /**
   * Verificar si tiene imagen para mostrar
   */
  hasImage(): boolean {
    return this.imageUrl !== null && this.imageUrl !== undefined && this.imageUrl.length > 0;
  }

  /**
   * Verificar si tiene iframe para mostrar
   */
  hasIframe(): boolean {
    return this.iframeUrl !== null && this.iframeUrl !== undefined && this.iframeUrl.toString().length > 0;
  }

  /**
   * Verificar si tiene contenido multimedia
   */
  hasMultimedia(): boolean {
    return this.hasImage() || this.hasIframe();
  }

  /**
   * Verificar si tiene proceso
   */
  hasProceso(): boolean {
    return this.procesoList !== null && this.procesoList.length > 0;
  }

  /**
   * Verificar si tiene direcciones
   */
  hasDirecciones(): boolean {
    return this.direccionesList !== null && this.direccionesList.length > 0;
  }

  /**
   * Verificar si tiene contactos múltiples
   */
  hasMultipleContactos(): boolean {
    return this.contactosList !== null && this.contactosList.length > 1;
  }

  /**
   * Verificar si el proceso tiene múltiples pasos
   */
  hasMultipleProcesos(): boolean {
    return this.procesoList !== null && this.procesoList.length > 1;
  }
}

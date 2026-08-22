// form.component.ts
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from "@angular/forms";
import { Institucion } from '../../interfaces/institucion';
import { LordAlertService } from '../lord-alert/service/lord-alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  @Input() institutoSeleccionado: Institucion | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<any>();

  form!: FormGroup;

  // Variables para el tooltip de imágenes
  mostrarTooltipImagenes = false;
  imagenesDisponibles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // ✅ Mapa de URLs en duro para las imágenes
  imageUrls: { [key: number]: string } = {
    1: '/assets/1.jpg',
    2: '/assets/2.jpg',
    3: '/assets/3.jpg',
    4: '/assets/4.jpg',
    5: '/assets/5.jpg',
    6: '/assets/6.jpg',
    7: '/assets/7.jpg',
    8: '/assets/8.jpg',
    9: '/assets/9.jpg'
  };

  constructor(
    private formBuilder: FormBuilder,
    private lordAlert: LordAlertService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void { }

  // Método para toggle del tooltip
  toggleTooltipImagenes(): void {
    this.mostrarTooltipImagenes = !this.mostrarTooltipImagenes;
  }

  // ✅ Método para obtener la URL de la imagen usando el mapa
  getImageUrl(numero: number): string {
    return this.imageUrls[numero] || '/assets/1.jpg';
  }

  // ✅ Método para manejar errores de carga de imágenes
  onImageError(event: any): void {
    // Si la imagen no carga, usa la imagen 1 como fallback
    event.target.src = '/assets/1.jpg';
  }

  // Método para seleccionar una imagen al hacer clic
  seleccionarImagen(numero: number): void {
    this.form.get('imagen')?.setValue(numero.toString());
    this.mostrarTooltipImagenes = false;
    this.lordAlert.showToast(`Imagen ${numero} seleccionada`, 'info');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['institutoSeleccionado']) {
      console.log('Cambio detectado:', this.institutoSeleccionado);

      if (this.institutoSeleccionado !== null && this.institutoSeleccionado !== undefined) {
        console.log('Editando instituto:', this.institutoSeleccionado);
        this.actualizarFormulario(this.institutoSeleccionado);
      } else {
        console.log('Creando nuevo instituto');
        this.resetearFormulario();
      }
    }
  }

  private crearFormulario(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      contacto: ['', Validators.required],
      correo: ['', [Validators.email]],
      direcciones: this.formBuilder.array([]),
      iframe: [''],
      imagen: [''],
      proceso: ['', Validators.required],
      activo: [true]
    });
  }

  private crearDireccionGroup(direccion: string = ''): FormGroup {
    return this.formBuilder.group({
      direccion: [direccion, Validators.required]
    });
  }

  // Getters para FormArray
  get direccionesArray(): FormArray {
    return this.form.get('direcciones') as FormArray;
  }

  get direccionesControls(): FormGroup[] {
    return this.direccionesArray.controls as FormGroup[];
  }

  // Agregar dirección
  agregarDireccion(): void {
    this.direccionesArray.push(this.crearDireccionGroup(''));
  }

  // Eliminar dirección
  eliminarDireccion(index: number): void {
    if (this.direccionesArray.length > 1) {
      this.direccionesArray.removeAt(index);
    } else {
      this.lordAlert.showToast('Debe haber al menos una dirección', 'warning');
    }
  }

  private actualizarFormulario(instituto: Institucion): void {
    // Limpiar el FormArray de direcciones COMPLETAMENTE
    while (this.direccionesArray.length > 0) {
      this.direccionesArray.removeAt(0);
    }

    // Si el instituto tiene direcciones, agregarlas todas
    if (instituto.direcciones && instituto.direcciones.length > 0) {
      instituto.direcciones.forEach((dir) => {
        const direccionText = dir.direccion || '';
        this.direccionesArray.push(
          this.formBuilder.group({
            direccion: [direccionText, Validators.required]
          })
        );
      });
    } else {
      // Si no tiene direcciones, agregar una vacía
      this.direccionesArray.push(this.crearDireccionGroup(''));
    }

    // Actualizar el resto de los campos
    this.form.patchValue({
      nombre: instituto.nombre || '',
      descripcion: instituto.descripcion || '',
      contacto: instituto.contacto || '',
      correo: instituto.correo || '',
      iframe: instituto.iframe || '',
      imagen: instituto.imagen || '',
      proceso: instituto.proceso || '',
      activo: instituto.activo !== undefined ? instituto.activo : true
    });

    console.log('Total direcciones cargadas:', this.direccionesArray.length);
    console.log('Direcciones:', this.direccionesArray.value);
  }

  private resetearFormulario(): void {
    // Limpiar el FormArray de direcciones
    while (this.direccionesArray.length > 0) {
      this.direccionesArray.removeAt(0);
    }

    // Agregar una dirección vacía
    this.direccionesArray.push(this.crearDireccionGroup(''));

    // Resetear el resto del formulario
    this.form.reset({
      nombre: '',
      descripcion: '',
      contacto: '',
      correo: '',
      iframe: '',
      imagen: '',
      proceso: '',
      activo: true
    });
  }

  onCloseModal(): void {
    this.resetearFormulario();
    this.mostrarTooltipImagenes = false;
    this.closeModalEvent.emit();
  }

  submit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      // Marcar direcciones como tocadas
      this.direccionesArray.controls.forEach(control => {
        control.get('direccion')?.markAsTouched();
      });
      this.lordAlert.showToast('Por favor, completa todos los campos requeridos', 'warning');
      return;
    }

    const formValue = this.form.value;

    // Extraer solo las direcciones en formato string[]
    const direccionesStrings = formValue.direcciones
      .map((d: any) => d.direccion)
      .filter((d: string) => d && d.trim());

    // Construir el objeto para la API
    const institutoData: any = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      contacto: formValue.contacto,
      direcciones: direccionesStrings,
      correo: formValue.correo || null,
      imagen: formValue.imagen || '1',
      proceso: formValue.proceso,
      iframe: formValue.iframe || ''
    };

    // Si estamos editando, agregar el ID
    if (this.institutoSeleccionado && this.institutoSeleccionado.id) {
      institutoData.id = this.institutoSeleccionado.id;
    }

    console.log('Datos a guardar:', institutoData);

    this.saveEvent.emit({
      data: institutoData,
      activo: formValue.activo
    });

    this.lordAlert.showToast(
      this.institutoSeleccionado ? 'Instituto actualizado correctamente' : 'Instituto creado correctamente',
      'success'
    );

    this.onCloseModal();
  }

  // Getters para acceder fácilmente a los campos en el template
  get nombre() { return this.form.get('nombre'); }
  get descripcion() { return this.form.get('descripcion'); }
  get contacto() { return this.form.get('contacto'); }
  get correo() { return this.form.get('correo'); }
  get proceso() { return this.form.get('proceso'); }
  get iframe() { return this.form.get('iframe'); }
  get imagen() { return this.form.get('imagen'); }
  get activo() { return this.form.get('activo'); }
}

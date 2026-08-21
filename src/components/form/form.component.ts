import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
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

  constructor(
    private formBuilder: FormBuilder,
    private lordAlert: LordAlertService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    // No es necesario, ngOnChanges maneja las actualizaciones
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['institutoSeleccionado']) {
      console.log('Cambio detectado:', this.institutoSeleccionado);

      if (this.institutoSeleccionado !== null && this.institutoSeleccionado !== undefined) {
        console.log(this.institutoSeleccionado, '🥳 Editando instituto');
        this.actualizarFormulario(this.institutoSeleccionado);
      } else {
        console.log(this.institutoSeleccionado, '❌ Creando nuevo instituto');
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
      direccion: ['', Validators.required],
      iframe: [''],
      imagen: [''],
      proceso: ['', Validators.required],
      activo: [true] // Control local en el frontend
    });
  }

  private actualizarFormulario(instituto: Institucion): void {
    // Obtener la primera dirección si existe
    const direccion = instituto.direcciones && instituto.direcciones.length > 0
      ? instituto.direcciones[0].direccion
      : '';

    this.form.patchValue({
      nombre: instituto.nombre || '',
      descripcion: instituto.descripcion || '',
      contacto: instituto.contacto || '',
      correo: instituto.correo || '',
      direccion: direccion,
      iframe: instituto.iframe || '',
      imagen: instituto.imagen || '',
      proceso: instituto.proceso || '',
      activo: instituto.activo !== undefined ? instituto.activo : true
    });
  }

  private resetearFormulario(): void {
    this.form.reset({
      nombre: '',
      descripcion: '',
      contacto: '',
      correo: '',
      direccion: '',
      iframe: '',
      imagen: '',
      proceso: '',
      activo: true
    });
  }

  onCloseModal(): void {
    this.closeModalEvent.emit();
  }

  submit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      this.lordAlert.showToast('Por favor, completa todos los campos requeridos', 'warning');
      return;
    }

    const formValue = this.form.value;

    // Construir el objeto base para enviar a la API (sin el campo activo)
    const institutoData: any = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      contacto: formValue.contacto,
      correo: formValue.correo || null,
      direcciones: [
        {
          direccion: formValue.direccion
        }
      ],
      iframe: formValue.iframe || '',
      imagen: formValue.imagen || '',
      proceso: formValue.proceso
    };

    // Si estamos editando, agregar el ID
    if (this.institutoSeleccionado && this.institutoSeleccionado.id) {
      institutoData.id = this.institutoSeleccionado.id;
    }

    console.log('Datos a guardar (sin activo):', institutoData);

    // Emitir los datos junto con el estado activo para el frontend
    this.saveEvent.emit({
      data: institutoData,
      activo: formValue.activo // Control local para el frontend
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
  get direccion() { return this.form.get('direccion'); }
  get proceso() { return this.form.get('proceso'); }
  get iframe() { return this.form.get('iframe'); }
  get imagen() { return this.form.get('imagen'); }
  get activo() { return this.form.get('activo'); }
}

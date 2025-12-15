import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Institucion } from '../../interfaces/institucion';
import { LordAlertService } from '../lord-alert/service/lord-alert.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {


  @Input() institutoSeleccionado: Institucion | null = null;
  // @Input() close?: () => void;

  @Output() closeModalEvent = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private lordAlert: LordAlertService) {

    this.crearFormulario();
  }

  ngOnInit(): void {

    // if (this.institutoSeleccionado) {
    //   this.actualizarFormulario(this.institutoSeleccionado);
    // }



  }


  ngOnChanges(changes: SimpleChanges): void {
    // Este método se ejecuta ANTES que ngOnInit cuando hay @Input
    if (changes['institutoSeleccionado']) {
      console.log('Cambio detectado:', this.institutoSeleccionado);

      if (this.institutoSeleccionado !== null) {
        console.log(this.institutoSeleccionado, '🥳');
        this.actualizarFormulario(this.institutoSeleccionado);
      } else {
        console.log(this.institutoSeleccionado, '❌');
        this.resetearFormulario();
      }
    }
  }


  private crearFormulario(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: [''],
      contacto: [''],
      correo: [''],
      iframe: ['', Validators.required],
      estado: ['1', Validators.required],
      proceso: ['', Validators.required]
    });
  }

  private actualizarFormulario(instituto: Institucion): void {
    // Usar patchValue para actualizar valores sin recrear el form
    this.form.patchValue({
      nombre: instituto.nombre,
      descripcion: instituto.descripcion,
      direccion: instituto.direccion || '',
      contacto: instituto.contacto || '',
      correo: instituto.correo || '',
      iframe: instituto.iframe,
      estado: instituto.activo ? '1' : '0',
      proceso: instituto.proceso
    });
  }


  private resetearFormulario(): void {
    this.form.reset({
      estado: '1'
    });
  }

  onCloseModal(): void {
    // Opción A: Emitir evento
    this.closeModalEvent.emit();

    // Opción B: Llamar función si existe
    // if (this.closeModalFn) {
    //   this.closeModalFn();
    // }
  }


  submit() {




    if (this.form.valid) {
      console.log(this.form.value);
      this.lordAlert.showToast('Instituto guardado correctamente !', 'success')
      this.onCloseModal();
    }
  }
}

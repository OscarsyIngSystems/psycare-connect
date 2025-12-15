import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: [''],
      contacto: [''],
      correo: [''],
      iframe: ['', Validators.required],
      estado: ['1', Validators.required],
      atencion: ['', Validators.required]
    })
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}

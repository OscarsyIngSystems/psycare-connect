import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LordAlertService } from '../lord-alert/service/lord-alert.service';
@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss'
})
export class TituloComponent {

  constructor(private router: Router, private lordAlert: LordAlertService) { }


  // Modelo para el formulario
  loginData = {
    email: '',
    password: ''
  };

  // Estados de validación
  formErrors = {
    email: '',
    password: ''
  };

  isAutenticated = false;
  // Patterns para validación
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  // Estados del formulario
  isSubmitting = false;
  showPassword = false;

  onSubmit() {
    // Resetear errores
    this.formErrors = { email: '', password: '' };

    // Validar campos
    const isValid = this.validateForm();

    if (isValid) {
      this.isSubmitting = true;

      // Simular llamada a API




      // Aquí iría tu llamada al servicio de autenticación
      this.authenticateUser(this.loginData);
    }
  }



  private validateForm(): boolean {
    let isValid = true;

    // Validar email
    if (!this.loginData.email) {
      this.formErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!this.emailPattern.test(this.loginData.email)) {
      this.formErrors.email = 'El formato del correo electrónico no es válido';
      isValid = false;
    }

    // Validar contraseña
    if (!this.loginData.password) {
      this.formErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (this.loginData.password.length < 6) {
      this.formErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }
    // Descomenta si quieres usar el pattern más estricto:
    // else if (!this.passwordPattern.test(this.loginData.password)) {
    //   this.formErrors.password = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial';
    //   isValid = false;
    // }

    return isValid;
  }

  private authenticateUser(loginData: any) {
    // Simular llamada a API


    if (this.loginData.password == 'Lord86901121') {
      console.log('usuario autenticado');
      this.isAutenticated = true;
      sessionStorage.setItem('accesoRedireccion', 'true');
      this.router.navigate(['/admin']);
    } else {
      this.lordAlert.showModal('Error', 'Credenciales inválidas. Por favor, inténtalo de nuevo.', 'error');
    }
    // Aquí iría tu lógica real de autenticación
    // this.authService.login(loginData).subscribe({
    //   next: (response) => this.handleLoginSuccess(response),
    //   error: (error) => this.handleLoginError(error)
    // });

    this.isSubmitting = false;
    this.resetForm();
    // Cerrar modal después de login exitoso (simulado)
    this.closeModal();


  }


  // Método para cerrar el modal
  closeModal() {
    this.resetForm();

    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  // Resetear formulario
  resetForm() {
    this.loginData = { email: '', password: '' };
    this.formErrors = { email: '', password: '' };
    this.isSubmitting = false;
  }

  // Validación en tiempo real (opcional)
  onEmailChange() {
    if (this.loginData.email && !this.emailPattern.test(this.loginData.email)) {
      this.formErrors.email = 'Formato de email inválido';
    } else {
      this.formErrors.email = '';
    }
  }

  onPasswordChange() {
    if (this.loginData.password && this.loginData.password.length < 6) {
      this.formErrors.password = 'Mínimo 6 caracteres';
    } else {
      this.formErrors.password = '';
    }
  }

  // Toggle para mostrar/ocultar contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  logout() {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    this.isAutenticated = false;
    // Aquí puedes agregar la lógica para limpiar tokens, redirigir, etc.
    this.router.navigate(['/']);
  }
}

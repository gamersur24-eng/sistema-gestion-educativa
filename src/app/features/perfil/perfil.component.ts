import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Usuario } from '../../core/models/user.model';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  currentUser: Usuario | null = null;
  perfilForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  showPasswordSection = false;

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.perfilForm.patchValue({
        nombre: this.currentUser.nombre,
        email: this.currentUser.email
      });
    }
  }

  updateProfile(): void {
    if (this.perfilForm.valid && this.currentUser) {
      this.loading = true;
      const updatedData = {
        ...this.currentUser,
        ...this.perfilForm.value
      };

      this.usuariosService.updateUsuario(this.currentUser.id!, updatedData).subscribe({
        next: () => {
          // Actualizar el usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(updatedData));
          this.toastService.success('Perfil actualizado exitosamente');
          this.loading = false;
        },
        error: () => {
          this.toastService.error('Error al actualizar perfil');
          this.loading = false;
        }
      });
    }
  }

  updatePassword(): void {
    if (this.passwordForm.valid && this.currentUser) {
      this.loading = true;
      const { newPassword } = this.passwordForm.value;

      const updatedData = {
        ...this.currentUser,
        password: newPassword
      };

      this.usuariosService.updateUsuario(this.currentUser.id!, updatedData).subscribe({
        next: () => {
          this.toastService.success('Contraseña actualizada exitosamente');
          this.passwordForm.reset();
          this.showPasswordSection = false;
          this.loading = false;
        },
        error: () => {
          this.toastService.error('Error al actualizar contraseña');
          this.loading = false;
        }
      });
    }
  }

  getRoleName(rol: string): string {
    const roles: any = {
      'admin': 'Administrador',
      'profesor': 'Profesor',
      'estudiante': 'Estudiante'
    };
    return roles[rol] || rol;
  }

  logout(): void {
    if (confirm('¿Está seguro de cerrar sesión?')) {
      this.authService.logout();
    }
  }
}

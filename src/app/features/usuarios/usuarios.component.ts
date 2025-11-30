import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Usuario } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  loading = false;
  errorMessage = '';
  showModal = false;

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      rol: ['estudiante', Validators.required],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.errorMessage = '';
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar usuarios. Por favor, verifica que JSON Server esté ejecutándose.';
        this.loading = false;
      }
    });
  }

  openModal(usuario?: Usuario): void {
    this.showModal = true;
    if (usuario) {
      this.isEditing = true;
      this.editingId = usuario.id!;
      this.usuarioForm.patchValue({
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        activo: usuario.activo
      });
      // No mostrar contraseña al editar
      this.usuarioForm.get('password')?.clearValidators();
      this.usuarioForm.get('password')?.updateValueAndValidity();
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.usuarioForm.reset({ rol: 'estudiante', activo: true });
      // Contraseña requerida al crear
      this.usuarioForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.usuarioForm.get('password')?.updateValueAndValidity();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.usuarioForm.reset({ rol: 'estudiante', activo: true });
    this.isEditing = false;
    this.editingId = null;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      const usuarioData = this.usuarioForm.value;

      // No enviar contraseña vacía al editar
      if (this.isEditing && !usuarioData.password) {
        delete usuarioData.password;
      }

      if (this.isEditing && this.editingId) {
        this.usuariosService.updateUsuario(this.editingId, usuarioData).subscribe({
          next: () => {
            this.loadUsuarios();
            this.closeModal();
            alert('Usuario actualizado exitosamente');
          },
          error: (error) => {
            this.errorMessage = 'Error al actualizar usuario';
            this.loading = false;
          }
        });
      } else {
        this.usuariosService.createUsuario(usuarioData).subscribe({
          next: () => {
            this.loadUsuarios();
            this.closeModal();
            alert('Usuario creado exitosamente');
          },
          error: (error) => {
            this.errorMessage = 'Error al crear usuario';
            this.loading = false;
          }
        });
      }
    }
  }

  deleteUsuario(id: number, nombre: string): void {
    if (confirm(`¿Está seguro de eliminar al usuario "${nombre}"?`)) {
      this.usuariosService.deleteUsuario(id).subscribe({
        next: () => {
          this.loadUsuarios();
          alert('Usuario eliminado exitosamente');
        },
        error: (error) => {
          alert('Error al eliminar usuario');
        }
      });
    }
  }

  getRoleBadgeClass(rol: string): string {
    return `badge-${rol}`;
  }

  logout(): void {
    if (confirm('¿Está seguro de cerrar sesión?')) {
      this.authService.logout();
    }
  }
}

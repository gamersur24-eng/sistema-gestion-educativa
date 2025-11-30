import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CursosService } from '../../core/services/cursos.service';
import { UsuariosService } from '../../core/services/usuarios.service';
import { InscripcionesService } from '../../core/services/inscripciones.service';
import { Usuario } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: Usuario | null = null;
  totalCursos = 0;
  totalUsuarios = 0;
  cursosInscritos = 0;
  loading = true;

  constructor(
    private authService: AuthService,
    private cursosService: CursosService,
    private usuariosService: UsuariosService,
    private inscripcionesService: InscripcionesService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadStatistics();
  }

  loadStatistics(): void {
    // Cargar total de cursos
    this.cursosService.getCursos().subscribe({
      next: (cursos) => {
        this.totalCursos = cursos.length;
      }
    });

    // Cargar total de usuarios (solo para admin)
    if (this.isAdmin()) {
      this.usuariosService.getUsuarios().subscribe({
        next: (usuarios) => {
          this.totalUsuarios = usuarios.length;
          this.loading = false;
        }
      });
    }

    // Cargar cursos inscritos (solo para estudiantes)
    if (this.isEstudiante() && this.currentUser?.id) {
      this.inscripcionesService.getInscripcionesByUsuario(this.currentUser.id).subscribe({
        next: (inscripciones) => {
          this.cursosInscritos = inscripciones.length;
          this.loading = false;
        }
      });
    }

    if (this.isProfesor()) {
      this.loading = false;
    }
  }

  isAdmin(): boolean {
    return this.currentUser?.rol === 'admin';
  }

  isProfesor(): boolean {
    return this.currentUser?.rol === 'profesor';
  }

  isEstudiante(): boolean {
    return this.currentUser?.rol === 'estudiante';
  }

  logout(): void {
    if (confirm('¿Está seguro de cerrar sesión?')) {
      this.authService.logout();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../core/services/cursos.service';
import { InscripcionesService } from '../../core/services/inscripciones.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../shared/services/toast.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { Curso } from '../../core/models/course.model';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SearchBarComponent],
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css']
})
export class MisCursosComponent implements OnInit {
  cursosDisponibles: Curso[] = [];
  cursosInscritos: any[] = [];
  filteredCursos: Curso[] = [];
  currentUser: any;
  loading = false;
  inscritosMap: Map<number, boolean> = new Map();

  constructor(
    private cursosService: CursosService,
    private inscripcionesService: InscripcionesService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    
    // Cargar cursos disponibles
    this.cursosService.getCursos().subscribe({
      next: (cursos) => {
        this.cursosDisponibles = cursos;
        this.filteredCursos = cursos;
        this.loadInscripciones();
      },
      error: () => {
        this.toastService.error('Error al cargar cursos');
        this.loading = false;
      }
    });
  }

  loadInscripciones(): void {
    this.inscripcionesService.getInscripcionesByUsuario(this.currentUser.id).subscribe({
      next: (inscripciones) => {
        // Crear mapa de cursos inscritos
        inscripciones.forEach(insc => {
          this.inscritosMap.set(insc.cursoId, true);
        });
        
        // Cargar detalles de cursos inscritos
        this.cursosInscritos = [];
        inscripciones.forEach(insc => {
          this.cursosService.getCursoById(insc.cursoId).subscribe({
            next: (curso) => {
              this.cursosInscritos.push({
                ...curso,
                inscripcionId: insc.id,
                fechaInscripcion: insc.fechaInscripcion
              });
            }
          });
        });
        
        this.loading = false;
      },
      error: () => {
        this.toastService.error('Error al cargar inscripciones');
        this.loading = false;
      }
    });
  }

  estaInscrito(cursoId: number): boolean {
    return this.inscritosMap.has(cursoId);
  }

  inscribirse(curso: Curso): void {
    if (confirm(`¿Deseas inscribirte al curso "${curso.nombre}"?`)) {
      this.inscripcionesService.inscribirse(this.currentUser.id, curso.id!).subscribe({
        next: () => {
          this.toastService.success(`Te inscribiste exitosamente a ${curso.nombre}`);
          this.loadData();
        },
        error: () => {
          this.toastService.error('Error al inscribirse');
        }
      });
    }
  }

  desinscribirse(cursoInscrito: any): void {
    if (confirm(`¿Deseas desinscribirte del curso "${cursoInscrito.nombre}"?`)) {
      this.inscripcionesService.desinscribirse(cursoInscrito.inscripcionId).subscribe({
        next: () => {
          this.toastService.success(`Te desinscribiste de ${cursoInscrito.nombre}`);
          this.loadData();
        },
        error: () => {
          this.toastService.error('Error al desinscribirse');
        }
      });
    }
  }

  onSearch(term: string): void {
    if (!term) {
      this.filteredCursos = [...this.cursosDisponibles];
      return;
    }
    
    this.filteredCursos = this.cursosDisponibles.filter(curso =>
      curso.nombre.toLowerCase().includes(term.toLowerCase()) ||
      curso.descripcion.toLowerCase().includes(term.toLowerCase()) ||
      curso.profesor.toLowerCase().includes(term.toLowerCase())
    );
  }

  logout(): void {
    if (confirm('¿Está seguro de cerrar sesión?')) {
      this.authService.logout();
    }
  }
}

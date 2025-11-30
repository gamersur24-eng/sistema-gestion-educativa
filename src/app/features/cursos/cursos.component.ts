import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CursosService } from '../../core/services/cursos.service';
import { Curso } from '../../core/models/course.model';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../shared/services/toast.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SearchBarComponent],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  filteredCursos: Curso[] = [];
  cursoForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  loading = false;
  errorMessage = '';
  showModal = false;
  currentUserName = '';

  constructor(
    private cursosService: CursosService,
    private authService: AuthService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      creditos: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      profesor: ['', Validators.required]
    });

    const user = this.authService.getCurrentUser();
    this.currentUserName = user?.nombre || '';
  }

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.loading = true;
    this.errorMessage = '';
    this.cursosService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.filteredCursos = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar los cursos';
        this.loading = false;
      }
    });
  }

  onSearch(term: string): void {
    if (!term) {
      this.filteredCursos = [...this.cursos];
      return;
    }
    
    this.filteredCursos = this.cursos.filter(curso =>
      curso.nombre.toLowerCase().includes(term.toLowerCase()) ||
      curso.descripcion.toLowerCase().includes(term.toLowerCase()) ||
      curso.profesor.toLowerCase().includes(term.toLowerCase())
    );
  }

  openModal(curso?: Curso): void {
    this.showModal = true;
    if (curso) {
      this.isEditing = true;
      this.editingId = curso.id!;
      this.cursoForm.patchValue(curso);
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.cursoForm.reset();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.cursoForm.reset();
    this.isEditing = false;
    this.editingId = null;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.cursoForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      const cursoData = this.cursoForm.value;

      if (this.isEditing && this.editingId) {
        this.cursosService.updateCurso(this.editingId, cursoData).subscribe({
          next: () => {
            this.loadCursos();
            this.closeModal();
            this.toastService.success('Curso actualizado exitosamente');
          },
          error: () => {
            this.errorMessage = 'Error al actualizar curso';
            this.loading = false;
            this.toastService.error('Error al actualizar curso');
          }
        });
      } else {
        this.cursosService.createCurso(cursoData).subscribe({
          next: () => {
            this.loadCursos();
            this.closeModal();
            this.toastService.success('Curso creado exitosamente');
          },
          error: () => {
            this.errorMessage = 'Error al crear curso';
            this.loading = false;
            this.toastService.error('Error al crear curso');
          }
        });
      }
    }
  }

  deleteCurso(id: number, nombre: string): void {
    if (confirm(`¿Está seguro de eliminar el curso "${nombre}"?`)) {
      this.cursosService.deleteCurso(id).subscribe({
        next: () => {
          this.loadCursos();
          this.toastService.success(`Curso "${nombre}" eliminado`);
        },
        error: () => {
          this.toastService.error('Error al eliminar curso');
        }
      });
    }
  }

  logout(): void {
    if (confirm('¿Está seguro de cerrar sesión?')) {
      this.authService.logout();
    }
  }
}
